import { deserializeGenerateConfig } from "./helper/configHelper";
import { _Character } from "./types/data";
import { Preset } from "./types/game";

// 颜色数据
export enum Color {
  RED,
  YELLOW,
  BLUE,
  GREEN,
  BLACK,
  WHITE
};
export const colorData: Record<Color, { name: string, code: string }> = {
  [Color.RED]: { name: "红", code: "#ff6b6b" },
  [Color.YELLOW]: { name: "黄", code: "#ffd166" },
  [Color.BLUE]: { name: "蓝", code: "#45b7d1" },
  [Color.GREEN]: { name: "绿", code: "#06d6a0" },
  [Color.BLACK]: { name: "黑", code: "#000000" },
  [Color.WHITE]: { name: "白", code: "#cccccc" }
}

// 地图数据
export const mapLabels: Record<number, string> = {
  1: "幽魂暗巷",
  2: "龙宫游乐园",
  3: "魔法学院",
  4: "水乡古镇",
  5: "御魂庆典",
  6: "星趴·梦想号"
};

// 难度数据
export const difficultyLabels: Record<number, string> = {
  1: "普通",
  2: "困难",
  3: "噩梦",
  4: "疯狂"
};
export enum TagClass {
  ROLE,
  CHIP,
  TIME,
  ATTACK,
  DEFENSE,
  HP,
  SKILL
}
export const Tags = {
  "物理": { type: TagClass.ROLE },
  "魔法": { type: TagClass.ROLE },
  "辅助": { type: TagClass.ROLE },
  "奶辅": { type: TagClass.ROLE },
  "钱辅": { type: TagClass.ROLE },
  "功能辅": { type: TagClass.ROLE },
  "星光": { type: TagClass.CHIP },
  "标记": { type: TagClass.CHIP },
  "治愈": { type: TagClass.CHIP },

  "一期": { type: TagClass.TIME },
  "二期": { type: TagClass.TIME },
  "三期": { type: TagClass.TIME },
  "联动": { type: TagClass.TIME },

  "0攻": { type: TagClass.ATTACK },
  "1攻": { type: TagClass.ATTACK },
  "2攻": { type: TagClass.ATTACK },

  "0防": { type: TagClass.DEFENSE },
  "1防": { type: TagClass.DEFENSE },
  "2防": { type: TagClass.DEFENSE },
  "4防": { type: TagClass.DEFENSE },

  "8血": { type: TagClass.HP },
  "9血": { type: TagClass.HP },
  "10血": { type: TagClass.HP },
  "11血": { type: TagClass.HP },
  "14血": { type: TagClass.HP },

  "2CD": { type: TagClass.SKILL },
  "3CD": { type: TagClass.SKILL },
  "4CD": { type: TagClass.SKILL }
};


export const chars: _Character<Color, typeof Tags>[] = [
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/1/1c/b7anvun0qgvhfgl1hsab13q1d9tpbrt.png/100px-UT_Hero_RolePhoto_101.png",
    "name": "商业之主:帕露南",
    "color": [Color.RED],
    "related": ["辅助", "钱辅", "一期", "1攻", "2防", "10血", "2CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/6/6b/ewqtgupb3yh1lqt15xasvns3jzqz3ch.png/100px-UT_Hero_RolePhoto_102.png",
    "name": "古怪侦探:芬妮",
    "color": [Color.YELLOW],
    "related": ["辅助", "一期", "1攻", "2防", "10血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/f/f9/t28e8s92vbs0o9jw13t131fir8smrnt.png/100px-UT_Hero_RolePhoto_103.png",
    "name": "社恐修女:阿兰娜",
    "color": [Color.BLUE],
    "related": ["物理", "一期", "1攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/e/ed/2rem4rn3nd33nytcay9hmfijoitsqnv.png/100px-UT_Hero_RolePhoto_104.png",
    "name": "暗影忍者:小町",
    "color": [Color.RED],
    "related": ["魔法", "一期", "1攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/d/db/ifb9aoeadn82x0xj9xvxzx7e4xf8tji.png/100px-UT_Hero_RolePhoto_105.png",
    "name": "社员叔叔:派德曼",
    "color": [Color.BLUE],
    "related": ["物理", "一期", "2攻", "2防", "8血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/b/b3/f9b6lpe82fmaowcffwo7cfvf8lrm4s2.png/100px-UT_Hero_RolePhoto_106.png",
    "name": "猩红辣妹:帕帕拉",
    "color": [Color.BLACK],
    "related": ["物理", "一期", "2攻", "1防", "10血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/1/14/helmqopw0eryy94qatyostcpjyy4huf.png/100px-UT_Hero_RolePhoto_107.png",
    "name": "游戏大师:恋",
    "color": [Color.BLUE],
    "related": ["辅助", "功能辅", "一期", "2攻", "1防", "8血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/9/92/bicolawu44dqputgyhz9nrv3didxdfu.png/100px-UT_Hero_RolePhoto_108.png",
    "name": "看板娘:米米",
    "color": [Color.BLUE],
    "related": ["辅助", "钱辅", "一期", "1攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/c/ca/i2is6ho0wlhg4f0sr038iie6wxjh9pl.png/100px-UT_Hero_RolePhoto_109.png",
    "name": "垃圾箱:Z3000",
    "color": [Color.RED],
    "related": ["物理", "一期", "1攻", "2防", "10血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/3/3d/gjzvlepcqnck4xoq2iotr1rekd9n75d.png/100px-UT_Hero_RolePhoto_110.png",
    "name": "肉弹战车:潘大猛",
    "color": [Color.BLACK],
    "related": ["辅助", "奶辅", "一期", "1攻", "0防", "14血", "4CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/9/9c/gdhhfwmmwx1wkj5qpc1zmrna6hnmikg.png/100px-UT_Hero_RolePhoto_112.png",
    "name": "史莱姆:璐璐",
    "color": [Color.GREEN],
    "related": ["辅助", "奶辅", "治愈", "一期", "2攻", "2防", "9血", "4CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/e/e3/5ti23lz36kcd5o8ji9k3kkr1vqogvzf.png/100px-UT_Hero_RolePhoto_113.png",
    "name": "旗袍娘:枫",
    "color": [Color.BLACK],
    "related": ["物理", "一期", "1攻", "0防", "10血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/e/e8/h1sbx184vq5vm9n2qdghael8ewpkauq.png/100px-UT_Hero_RolePhoto_114.png",
    "name": "命运少女:蓝海晴",
    "color": [Color.BLUE],
    "related": ["辅助", "钱辅", "二期", "1攻", "1防", "10血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/0/0d/dh6fdupcwk7qyj7f47hy3zzgl3d4xt2.png/100px-UT_Hero_RolePhoto_115.png",
    "name": "太刀使:美咲",
    "color": [Color.WHITE],
    "related": ["物理", "二期", "0攻", "2防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/7/72/1kstcnqxfsc8uigt44ajams17o7tyt0.png/100px-UT_Hero_RolePhoto_116.png",
    "name": "绿洲女王:娜蒂斯",
    "color": [Color.BLACK],
    "related": ["物理", "二期", "1攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/8/8a/3rocf02jljhx6xxiuos0wyh08h8rmu5.png/100px-UT_Hero_RolePhoto_117.png",
    "name": "家政机器人:茉莉",
    "color": [Color.GREEN],
    "related": ["物理", "二期", "1攻", "1防", "9血", "4CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/0/09/8nzyy5ydl0y9titzavtqe0ortn18d8h.png/100px-UT_Hero_RolePhoto_118.png",
    "name": "暗区少主:阿尔",
    "color": [Color.BLACK],
    "related": ["辅助", "功能辅", "星光", "二期", "1攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/2/2d/dyimj8s9r61ydp0ppszaw5pvaiovaec.png/100px-UT_Hero_RolePhoto_119.png",
    "name": "午夜闪光:星魅琉华",
    "color": [Color.BLACK],
    "related": ["物理", "二期", "1攻", "1防", "10血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/9/9a/idiolj7h013gbfjo8b8g8illh330bsl.png/100px-UT_Hero_RolePhoto_120.png",
    "name": "网络魅影:南希露",
    "color": [Color.WHITE],
    "related": ["物理", "二期", "1攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/b/bb/p3x082xmurhz4iwv8syu7d6hiq2mtad.png/100px-UT_Hero_RolePhoto_121.png",
    "name": "新人调查员:凛",
    "color": [Color.YELLOW],
    "related": ["魔法", "标记", "三期", "1攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/0/02/m7jy1ahjxry6ew0mkf06w800ekq4iqa.png/100px-UT_Hero_RolePhoto_122.png",
    "name": "机械超人:梅加斯",
    "color": [Color.BLUE],
    "related": ["魔法", "三期", "0攻", "2防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/d/d1/6mx9u3rxlkskk9btpq7ibqku6yudm2j.png/100px-UT_Hero_RolePhoto_123.png",
    "name": "风水师:姬梦朝",
    "color": [Color.BLACK],
    "related": ["辅助", "奶辅", "功能辅", "三期", "1攻", "1防", "10血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/a/a9/m2oheea4r90byag4x6q0pd5bojx4ru4.png/100px-UT_Hero_RolePhoto_124.png",
    "name": "三神御主:照",
    "color": [Color.RED],
    "related": ["物理", "辅助", "功能辅", "三期", "2攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/6/6b/g4lr2ypqj5jkbvzu7yjwd4w2qhfuh5i.png/100px-UT_Hero_RolePhoto_125.png",
    "name": "枪匠:摩西",
    "color": [Color.GREEN],
    "related": ["物理", "三期", "1攻", "1防", "11血", "2CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/0/0a/aq1h2scidws8c9lekzpkcofkruyu4no.png/100px-UT_Hero_RolePhoto_301.png",
    "name": "超天酱:超绝最可爱天使酱",
    "color": [Color.WHITE],
    "related": ["辅助", "钱辅", "星光", "联动", "0攻", "1防", "9血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/c/c4/l7jch9c54yb98coz2op06yd8a9kuuky.png/100px-UT_Hero_RolePhoto_302.png",
    "name": "糖糖:主播女孩",
    "color": [Color.BLACK],
    "related": ["物理", "联动", "1攻", "4防", "8血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/5/55/9k5sw0zroeh2vjd2bky20pjg7x1h361.png/100px-UT_Hero_RolePhoto_303.png",
    "name": "吉尔:吉尔·斯汀雷",
    "color": [Color.BLUE],
    "related": ["辅助", "奶辅", "功能辅", "联动", "1攻", "1防", "10血", "3CD"]
  },
  {
    "icon": "https://patchwiki.biligame.com/images/starengine/thumb/b/b8/ltx3ievbibmt4j5f1zsj9iuzqt8q2rq.png/100px-UT_Hero_RolePhoto_304.png",
    "name": "多萝西:多萝西·海兹",
    "color": [Color.RED],
    "related": ["物理", "联动", "1攻", "0防", "8血", "2CD"]
  }
];

export const defaultPresets: Preset[] = [
  {
    name: "禁2色",
    config: deserializeGenerateConfig({ "map": { "1": true, "2": true, "3": true, "4": true, "5": true, "6": true }, "difficulty": { "1": false, "2": false, "3": false, "4": true }, "groups": [], "globalConfig": { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": ["4", "2", "3", "0", "5", "1"], "select": 2 } } })
  },
  {
    name: "辅助输出分组",
    config: deserializeGenerateConfig({ "map": { "1": true, "2": true, "3": true, "4": true, "5": true, "6": true }, "difficulty": { "1": false, "2": false, "3": false, "4": true }, "groups": [{ "tagFilters": [{ "whitelist": true, "values": ["魔法", "物理"], "select": "2" }], "charFilters": [], "colorFilter": { "whitelist": false, "values": ["4", "2", "3", "0", "5", "1"], "select": 0 } }, { "tagFilters": [{ "whitelist": true, "values": ["辅助"], "select": "1" }], "charFilters": [], "colorFilter": { "whitelist": false, "values": ["4", "2", "3", "0", "5", "1"], "select": 0 } }], "globalConfig": { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": ["5", "4", "0", "2", "1", "3"], "select": "2" } } })
  },
  {
    name: "随机4人",
    config: deserializeGenerateConfig({ "map": { "1": true, "2": true, "3": true, "4": true, "5": true, "6": true }, "difficulty": { "1": false, "2": false, "3": false, "4": true }, "groups": [{ "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": [], "select": 0 } }, { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": [], "select": 0 } }, { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": [], "select": 0 } }, { "tagFilters": [], "charFilters": [], "colorFilter": { "whitelist": false, "values": [], "select": 0 } }], "globalConfig": { "tagFilters": [], "charFilters": [{ "whitelist": true, "values": ["商业之主:帕露南", "古怪侦探:芬妮", "社恐修女:阿兰娜", "暗影忍者:小町", "社员叔叔:派德曼", "猩红辣妹:帕帕拉", "游戏大师:恋", "看板娘:米米", "垃圾箱:Z3000", "肉弹战车:潘大猛", "史莱姆:璐璐", "旗袍娘:枫", "命运少女:蓝海晴", "太刀使:美咲", "绿洲女王:娜蒂斯", "家政机器人:茉莉", "暗区少主:阿尔", "午夜闪光:星魅琉华", "网络魅影:南希露", "新人调查员:凛", "机械超人:梅加斯", "风水师:姬梦朝", "三神御主:照", "枪匠:摩西", "超天酱:超绝最可爱天使酱", "糖糖:主播女孩", "吉尔:吉尔·斯汀雷", "多萝西:多萝西·海兹"], "select": "1" }], "colorFilter": { "whitelist": false, "values": [], "select": "0" } } })
  }
]

// 存储键
export const STORAGE_KEY = "mapRoleSelectionSettings";