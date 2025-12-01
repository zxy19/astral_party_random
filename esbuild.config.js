const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const production = process.argv.includes('--prod');
const watch = process.argv.includes('--watch');

// 清理dist目录
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}

// 创建一个插件来处理重建后的操作
const rebuildPlugin = {
  name: 'rebuild-logger',
  setup(build) {
    build.onEnd(result => {
      if (result.errors.length === 0) {
        console.log('Watch build succeeded');
        // 重新复制public目录中的静态文件
        setTimeout(() => {
          copyPublicAssets();
        }, 100);
      }
    });
  },
};

// 监听public目录下的文件变化
function watchPublicFiles(ctx) {
  const chokidar = require('chokidar');
  const watcher = chokidar.watch('public/**/*', {
    ignoreInitial: true,
  });
  
  watcher.on('change', (path) => {
    console.log(`Public file changed: ${path}`);
    copyPublicAssets();
  });
  
  watcher.on('add', (path) => {
    console.log(`Public file added: ${path}`);
    copyPublicAssets();
  });
  
  watcher.on('unlink', (path) => {
    console.log(`Public file removed: ${path}`);
    copyPublicAssets();
  });
}

async function build() {
  try {
    const buildOptions = {
      entryPoints: ['src/index.ts'],
      bundle: true,
      outdir: 'dist',
      entryNames: 'bundle-[hash]',
      minify: production,
      sourcemap: !production,
      loader: {
        '.js': 'jsx',
        '.ts': 'ts',
        '.tsx': 'tsx'
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
      },
      plugins: watch ? [rebuildPlugin] : []
    };

    // 只在非watch模式下直接build，watch模式使用context API
    let result;
    if (watch) {
      const ctx = await esbuild.context(buildOptions);
      
      // 启动监听
      await ctx.watch();
      
      // 监听public目录下的文件变化
      watchPublicFiles(ctx);
      
      console.log('Watching for changes...');
      
      // 初始复制public目录中的静态文件
      setTimeout(() => {
        copyPublicAssets();
      }, 100);
    } else {
      result = await esbuild.build(buildOptions);
      
      // 复制public目录中的静态文件
      setTimeout(() => {
        copyPublicAssets();
      }, 100);
      
      return result;
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

function copyPublicAssets() {
  try {
    // 确保dist目录存在
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }
    
    // 复制public目录下的所有文件到dist目录
    const publicFiles = fs.readdirSync('public');
    publicFiles.forEach(file => {
      const srcPath = path.join('public', file);
      const destPath = path.join('dist', file);
      const stats = fs.statSync(srcPath);
      
      if (stats.isFile()) {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    
    // 更新HTML引用
    updateHtmlReferences();
  } catch (error) {
    console.error('Error copying public assets:', error);
  }
}

function updateHtmlReferences() {
  try {
    // 获取生成的bundle文件名
    const distDir = 'dist';
    const files = fs.readdirSync(distDir);
    const bundleFile = files.find(file => file.startsWith('bundle-') && file.endsWith('.js'));
    const cssFile = files.find(file => file.startsWith('bundle-') && file.endsWith('.css'));
    
    if (bundleFile) {
      // 更新index.html中的引用
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        let htmlContent = fs.readFileSync(indexPath, 'utf-8');
        
        // 更新JS引用
        htmlContent = htmlContent.replace(/<script src="bundle\.js"><\/script>/, 
                                         `<script src="${bundleFile}"></script>`);
        
        // 如果有CSS文件，添加CSS引用
        if (cssFile) {
          htmlContent = htmlContent.replace(/<\/title>/, `</title>\n    <link href="${cssFile}" rel="stylesheet">`);
        }
        
        fs.writeFileSync(indexPath, htmlContent, 'utf-8');
      }
    }
  } catch (error) {
    console.error('Error updating HTML references:', error);
  }
}

build();