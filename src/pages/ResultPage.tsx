import m, { ClassComponent, Vnode } from 'mithril';
import { GLOBAL, saveGlobals } from '../helper/store';
import { Card } from '../components/base/Card';
import { CharacterPanel } from '../components/char/CharacterPanel';
import { chars } from '../data';
import { mapLabels } from '../data';
import { difficultyLabels } from '../data';
import { PlanRenderer } from '../renderer/PlanRender';
import { charIndex } from '../util/charIndex';
import { MultiSelector } from '../components/base/MultiSelector';
import { Button } from '../components/base/Button';

export class ResultPage implements ClassComponent {
  private graphImageDataUrl: string | null = null;
  private graphLoading: boolean = false;
  private graphError: string | null = null;
  private static GRAPH_SETTING_OPT = {
    showAvailable: "显示可用角色",
    showBanned: "显示禁用角色",
    showDescription: "显示描述",
    large: "更大的角色",
    slim: "更细的图片输出"
  }
  // 获取允许的角色列表
  private getAllowedCharacters(groupIndex: number) {
    if (!GLOBAL.currentPlan) return [];

    const groups = GLOBAL.currentPlan['groups'];
    if (groupIndex >= groups.length) return [];

    const charPlan = groups[groupIndex];
    return chars.filter(char => charPlan.isCharacterAllowed(char));
  }

  // 获取被禁止的角色列表
  private getBannedCharacters(groupIndex: number) {
    if (!GLOBAL.currentPlan) return [];

    const groups = GLOBAL.currentPlan['groups'];
    if (groupIndex >= groups.length) return [];

    const charPlan = groups[groupIndex];
    return chars.filter(char => charPlan.isCharacterBanned(char));
  }

  // 渲染地图和难度卡片
  private renderMapAndDifficulty() {
    if (!GLOBAL.currentPlan) return null;

    const map = GLOBAL.currentPlan['map'];
    const difficulty = GLOBAL.currentPlan['difficulty'];

    return [
      <div class="col-6 mb-3">
        <Card title="地图" className="h-100">
          <p class="card-text">{mapLabels[map]}</p>
        </Card>
      </div>,
      <div class="col-6 mb-3">
        <Card title="难度" className="h-100">
          <p class="card-text">{difficultyLabels[difficulty]}</p>
        </Card>
      </div>
    ];
  }

  // 渲染队伍角色面板
  private renderGroups() {
    if (!GLOBAL.currentPlan) return null;

    const groups = GLOBAL.currentPlan['groups'];
    return groups.map((_, index) => {
      const allowed = this.getAllowedCharacters(index);
      const banned = this.getBannedCharacters(index);
      const grpName = groups.length == 1 ? '角色详情' : `${charIndex(index)}组`
      return (

        <div class="col-12 mb-3">
          <Card title={grpName} collapsible={true}>
            <div class="alert alert-secondary" role="alert">
              {allowed.length} 可选， {banned.length} 被禁止
            </div>
            <div class="row">
              <div class="col-md-6 hr-right">
                <div>
                  <p class="card-text text-green text-center">可选</p>
                </div>
                <CharacterPanel characters={allowed} showTags={false} />
              </div>
              <div class="col-md-6">
                <div>
                  <p class="card-text text-red text-center">被禁止的角色</p>
                </div>
                <CharacterPanel characters={banned} showTags={false} />
              </div>
            </div>
          </Card >
        </div>
      );
    });
  }
  // 渲染图表
  private renderGraph() {
    // 如果还没有加载图像且没有正在加载，则开始加载
    if (!this.graphImageDataUrl && !this.graphLoading && !this.graphError && GLOBAL.currentPlan) {
      this.loadGraph();
    }

    // 显示加载状态
    if (this.graphLoading) {
      return (
        <p class="card-text">正在生成规划图...</p>
      );
    }

    // 显示错误信息
    if (this.graphError) {
      return (
        <p class="card-text">无法生成规划图: {this.graphError}</p>
      );
    }

    // 显示图像
    if (this.graphImageDataUrl) {
      return (
        <img src={this.graphImageDataUrl} alt="规划图" className='w-100' />
      );
    }

    return null;
  }

  // 加载图表
  private async loadGraph() {
    if (!GLOBAL.currentPlan) return;

    this.graphError = null;
    // 触发重新渲染以显示加载状态
    m.redraw();

    try {
      // 创建PlanRenderer实例并渲染计划
      const planRenderer = new PlanRenderer(GLOBAL.graphSetting);
      await planRenderer.drawPlan(GLOBAL.currentPlan);

      // 获取canvas并转换为图片数据URL
      const canvas = planRenderer.getCanvas();
      this.graphImageDataUrl = canvas.toDataURL('image/png');
    } catch (error) {
      // 错误处理
      console.error('渲染图形时出错:', error);
    } finally {
      this.graphLoading = false;
      // 触发重新渲染以显示最终结果
      m.redraw();
    }
  }

  private getSummaryHeader() {
    if (!GLOBAL.currentPlan) return null;

    const map = GLOBAL.currentPlan['map'];
    const difficulty = GLOBAL.currentPlan['difficulty'];

    const groups = GLOBAL.currentPlan['groups'];
    const groupCount = groups.length;
    let minCharacterCount = 1000;
    let totalAvailableCharacterCount = 0;
    let charMap: Record<string, boolean> = {}
    groups.forEach(group => {
      let availableCharacterCount = 0;
      chars
        .filter(char => group.isCharacterAllowed(char))
        .forEach(char => {
          availableCharacterCount++;
          if (!charMap[char.name])
            totalAvailableCharacterCount++;
          charMap[char.name] = true;
        });
      minCharacterCount = Math.min(minCharacterCount, availableCharacterCount);
    });

    return (
      <div class="header">
        <div class="container">
          <h1 class="display-4">{mapLabels[map]} - {difficultyLabels[difficulty]}</h1>
          <p class="lead">共 {groupCount} 组，最少的一组 {minCharacterCount} 个可选，一共 {totalAvailableCharacterCount} 角色可用</p>
        </div>
      </div>)
  }

  view(_vnode: Vnode) {
    return [
      this.getSummaryHeader(),
      <div className="container">
        <div class="row justify-content-center">
          {this.renderMapAndDifficulty()}
          {this.renderGroups()}
          <div class="col-12 mb-3">
            <Card title="配置信息图片" className="h-100">
              <MultiSelector options={ResultPage.GRAPH_SETTING_OPT} value={GLOBAL.graphSetting} onchange={() => { saveGlobals(); this.loadGraph() }} inline={true} />
              <hr />
              {this.renderGraph()}
            </Card>
          </div>
          <div class="col-12 text-center mb-3">
            <Button variant="primary" onclick={() => {
              m.route.set('/');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}>再次前往配置页</Button>
          </div>
        </div>
      </div>
    ]
  }
}