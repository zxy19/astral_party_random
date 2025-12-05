import m, { ClassComponent, Vnode } from 'mithril';
import { Card } from '../components/base/Card';
import { Selector } from '../components/base/Selector';
import { difficultyLabels, mapLabels, chars, defaultPresets } from '../data';
import { GLOBAL, saveGlobals, addCharConfig, savePreset } from '../helper/store';
import { MultiSelector } from '../components/base/MultiSelector';
import { Button } from '../components/base/Button';
import { Accordion } from '../components/base/Accordion';
import { GenerateCharConfig } from '../types/game';
import { CountSelector } from '../components/base/CountSelector';
import { CharConfigPanel } from '../components/config/CharConfigPanel';
import { storeGenerateConfig, getStoredGenerateConfig, clearAllStoredData } from '../helper/settings';
import { generatePlanFromGlobalConfigAndShow } from '../helper/store';
import { ResultPage } from './ResultPage';
import { CharacterPanel } from '../components/char/CharacterPanel';
import { PresetList } from '../components/config/PresetList';
import { deserializeGenerateConfig, serializeGenerateConfig } from '../helper/configHelper';

export class HomePage implements ClassComponent {

  view(_vnode: Vnode) {
    return [
      <div class="header">
        <div class="container">
          <h1 class="display-4">星引擎派对随机开局选择器</h1>
          <p class="lead">
            给自己的星趴上上压力<br />
            <a href="/legacy" className='link-light'>点击前往旧版本站点</a>
          </p>
        </div>
      </div>,
      <div className="container">
        <div class="row">
          <div className='col-md-4 col-sm-6'>
            <Card title="地图" className='h-100'>
              <MultiSelector options={mapLabels} value={GLOBAL.currentConfig.map} />
            </Card>
          </div>
          <div className='col-md-4 col-sm-6'>
            <Card title="难度" className='h-100'>
              <MultiSelector options={difficultyLabels} value={GLOBAL.currentConfig.difficulty} />
            </Card>
          </div>
          <div className='col-md-4 col-sm-6'>
            <Card title="配置" className='h-100'>
              <div className='text-center'>
                <Button variant="primary" block={true} size="lg" onclick={() => {
                  saveGlobals();
                  generatePlanFromGlobalConfigAndShow();
                }}>开始游戏</Button>
                <hr />
                <Button variant="secondary" block={true} onclick={() => {
                  addCharConfig();
                  m.redraw();
                }} className='mb-1'>添加角色组</Button>
                <div className='text-center'>
                  <Button variant="info" onclick={() => this.exportConfig()}>导出配置</Button>
                  <span> </span>
                  <Button variant="warning" onclick={() => this.importConfig()}>导入配置</Button>
                  <span> </span>
                  <Button variant="danger" onclick={() => this.clearConfig()}>清空配置</Button>
                  <span> </span>
                  <Button variant="secondary" onclick={() => this.saveCurrentPreset()}>保存预设</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <Accordion titleGetter={this.getTitle}>
          {this.makeConfigurationList()}
        </Accordion>

        <div class="row mt-4">
          <div className='col-12'>
            <Card title="预设">
              <PresetList presets={GLOBAL.savedPresets} canDelete={true} />
              {GLOBAL.savedPresets.length > 0 ? <hr /> : ""}
              <PresetList presets={defaultPresets} canDelete={false} />
            </Card>
          </div>
        </div>
        <div class="row mt-4">
          <div className='col-12'>
            <Card title="全部角色" collapsible={true}>
              <CharacterPanel characters={chars} showTags={true} />
            </Card>
          </div>
        </div>
      </div>
    ];
  }

  // 导出配置到文件
  private exportConfig() {
    const configData = JSON.stringify({
      _ver:1,
      data: serializeGenerateConfig(GLOBAL.currentConfig)
    });
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'gameConfig.json';
    document.body.appendChild(a);
    a.click();

    // 清理
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }

  // 从文件导入配置
  private importConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const configData = JSON.parse(e.target?.result as string);
          if(configData._ver === undefined){
            GLOBAL.currentConfig = configData;
          }else{
            GLOBAL.currentConfig = deserializeGenerateConfig(configData.data);
          }
          saveGlobals();
          m.redraw();
        } catch (error) {
          console.error('导入配置失败:', error);
          alert('配置文件格式错误');
        }
      };
      reader.readAsText(file);
    };

    input.click();
  }
  private clearConfig() {
    if (confirm("你确定要清空当前页面上的配置吗？"))
      clearAllStoredData();
  }
  private saveCurrentPreset() {
    const name = prompt("请输入预设名称");
    if (!name)
      return;
    savePreset({name, config: GLOBAL.currentConfig});
    m.redraw();
  }
  makeConfigurationList() {
    const allConfigs: any[] = [
      <CharConfigPanel idx={-1} />,
    ];
    for (let i = 0; i < GLOBAL.currentConfig.groups.length; i++) {
      allConfigs.push(<CharConfigPanel idx={i} />)
    }
    return allConfigs;
  }
  getTitle(index: number) {
    if (!index) {
      return "全局配置"
    }
    return String.fromCharCode("A".charCodeAt(0) + index - 1) + "组"
  }
}