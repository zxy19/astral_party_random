import m from 'mithril';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HomePage } from './pages/HomePage';
import { ResultPage } from './pages/ResultPage';
import { initGlobals, loadPlan } from './helper/store';

// 定义路由
const routes = {
    '/': HomePage,
    '/result/:plan': ResultPage
};
// 启动应用
initGlobals();
m.route(document.getElementById('app')!, '/', routes);
loadPlan();
m.redraw();