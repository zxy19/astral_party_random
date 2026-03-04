import m from 'mithril';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HomePage } from './pages/HomePage';
import { ResultPage } from './pages/ResultPage';
import { initGlobals, loadPlan } from './helper/store';
import { loadDefaultPresets } from './preset';
import { TryPage } from './pages/TryPage';

// 定义路由
const routes = {
    '/': HomePage,
    '/result/:plan': ResultPage,
    '/trying': TryPage,
};
// 启动应用
initGlobals();
m.route(document.getElementById('app')!, '/', routes);
loadPlan();
loadDefaultPresets();
m.redraw();