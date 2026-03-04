import m, { ClassComponent, route, Vnode } from 'mithril';
import { GLOBAL } from '../helper/store';
import { Button } from '../components/base/Button';

export class TryPage implements ClassComponent {
  view(_vnode: Vnode) {
    return [
      <div class="header">
        <div class="container">
          <h1 class="display-4">正在重试生成器</h1>
          <p class="lead">
            你的配队方案目前暂时没有找到可以游玩的队伍，正在进行重试
          </p>
        </div>
      </div>,
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">尝试中</span>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="text-center">
              {GLOBAL.tries || 0}/2000
            </div>
            <div class="text-center">
              <Button onclick={() => {
                GLOBAL.tries = -1;
                route.set('/');
              }}>
                取消
              </Button>
            </div>
          </div>
        </div>
      </div>
    ];
  }
}