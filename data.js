var STORAGE_KEY = "mapRoleSelectionSettings";
/**
 * @type {Data.Char[]}
 */
var chars = [
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/1/1c/b7anvun0qgvhfgl1hsab13q1d9tpbrt.png/100px-UT_Hero_RolePhoto_101.png",
        "name": "商业之主:帕露南",
        "color": 0,
        "related": ["辅助", "钱辅", "一期", "1攻", "2防", "10血", "2CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/6/6b/ewqtgupb3yh1lqt15xasvns3jzqz3ch.png/100px-UT_Hero_RolePhoto_102.png",
        "name": "古怪侦探:芬妮",
        "color": 1,
        "related": ["辅助", "一期", "1攻", "2防", "10血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/f/f9/t28e8s92vbs0o9jw13t131fir8smrnt.png/100px-UT_Hero_RolePhoto_103.png",
        "name": "社恐修女:阿兰娜",
        "color": 2,
        "related": ["物理", "一期", "1攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/e/ed/2rem4rn3nd33nytcay9hmfijoitsqnv.png/100px-UT_Hero_RolePhoto_104.png",
        "name": "暗影忍者:小町",
        "color": 0,
        "related": ["魔法", "一期", "1攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/d/db/ifb9aoeadn82x0xj9xvxzx7e4xf8tji.png/100px-UT_Hero_RolePhoto_105.png",
        "name": "社员叔叔:派德曼",
        "color": 2,
        "related": ["物理", "一期", "2攻", "2防", "8血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/b/b3/f9b6lpe82fmaowcffwo7cfvf8lrm4s2.png/100px-UT_Hero_RolePhoto_106.png",
        "name": "猩红辣妹:帕帕拉",
        "color": 4,
        "related": ["物理", "一期", "2攻", "1防", "10血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/1/14/helmqopw0eryy94qatyostcpjyy4huf.png/100px-UT_Hero_RolePhoto_107.png",
        "name": "游戏大师:恋",
        "color": 5,
        "related": ["辅助", "功能辅", "一期", "2攻", "1防", "8血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/9/92/bicolawu44dqputgyhz9nrv3didxdfu.png/100px-UT_Hero_RolePhoto_108.png",
        "name": "看板娘:米米",
        "color": 2,
        "related": ["辅助", "钱辅", "一期", "1攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/c/ca/i2is6ho0wlhg4f0sr038iie6wxjh9pl.png/100px-UT_Hero_RolePhoto_109.png",
        "name": "垃圾箱:Z3000",
        "color": 0,
        "related": ["物理", "一期", "1攻", "2防", "10血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/3/3d/gjzvlepcqnck4xoq2iotr1rekd9n75d.png/100px-UT_Hero_RolePhoto_110.png",
        "name": "肉弹战车:潘大猛",
        "color": 4,
        "related": ["辅助", "奶辅", "一期", "1攻", "0防", "14血", "4CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/9/9c/gdhhfwmmwx1wkj5qpc1zmrna6hnmikg.png/100px-UT_Hero_RolePhoto_112.png",
        "name": "史莱姆:璐璐",
        "color": 3,
        "related": ["辅助", "奶辅", "治愈", "一期", "2攻", "2防", "9血", "4CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/e/e3/5ti23lz36kcd5o8ji9k3kkr1vqogvzf.png/100px-UT_Hero_RolePhoto_113.png",
        "name": "旗袍娘:枫",
        "color": 4,
        "related": ["物理", "一期", "1攻", "0防", "10血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/e/e8/h1sbx184vq5vm9n2qdghael8ewpkauq.png/100px-UT_Hero_RolePhoto_114.png",
        "name": "命运少女:蓝海晴",
        "color": 2,
        "related": ["辅助", "钱辅", "二期", "1攻", "1防", "10血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/0/0d/dh6fdupcwk7qyj7f47hy3zzgl3d4xt2.png/100px-UT_Hero_RolePhoto_115.png",
        "name": "太刀使:美咲",
        "color": 5,
        "related": ["物理", "二期", "0攻", "2防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/7/72/1kstcnqxfsc8uigt44ajams17o7tyt0.png/100px-UT_Hero_RolePhoto_116.png",
        "name": "绿洲女王:娜蒂斯",
        "color": 4,
        "related": ["物理", "二期", "1攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/8/8a/3rocf02jljhx6xxiuos0wyh08h8rmu5.png/100px-UT_Hero_RolePhoto_117.png",
        "name": "家政机器人:茉莉",
        "color": 3,
        "related": ["物理", "二期", "1攻", "1防", "9血", "4CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/0/09/8nzyy5ydl0y9titzavtqe0ortn18d8h.png/100px-UT_Hero_RolePhoto_118.png",
        "name": "暗区少主:阿尔",
        "color": 4,
        "related": ["辅助", "功能辅", "星光", "二期", "1攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/2/2d/dyimj8s9r61ydp0ppszaw5pvaiovaec.png/100px-UT_Hero_RolePhoto_119.png",
        "name": "午夜闪光:星魅琉华",
        "color": 4,
        "related": ["物理", "二期", "1攻", "1防", "10血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/9/9a/idiolj7h013gbfjo8b8g8illh330bsl.png/100px-UT_Hero_RolePhoto_120.png",
        "name": "网络魅影:南希露",
        "color": 5,
        "related": ["物理", "二期", "1攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/b/bb/p3x082xmurhz4iwv8syu7d6hiq2mtad.png/100px-UT_Hero_RolePhoto_121.png",
        "name": "新人调查员:凛",
        "color": 1,
        "related": ["魔法", "标记", "三期", "1攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/0/02/m7jy1ahjxry6ew0mkf06w800ekq4iqa.png/100px-UT_Hero_RolePhoto_122.png",
        "name": "机械超人:梅加斯",
        "color": 2,
        "related": ["魔法", "三期", "0攻", "2防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/d/d1/6mx9u3rxlkskk9btpq7ibqku6yudm2j.png/100px-UT_Hero_RolePhoto_123.png",
        "name": "风水师:姬梦朝",
        "color": 4,
        "related": ["辅助", "奶辅", "功能辅", "三期", "1攻", "1防", "10血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/a/a9/m2oheea4r90byag4x6q0pd5bojx4ru4.png/100px-UT_Hero_RolePhoto_124.png",
        "name": "三神御主:照",
        "color": 0,
        "related": ["辅助", "功能辅", "三期", "2攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/6/6b/g4lr2ypqj5jkbvzu7yjwd4w2qhfuh5i.png/100px-UT_Hero_RolePhoto_125.png",
        "name": "枪匠:摩西",
        "color": 3,
        "related": ["物理", "三期", "1攻", "1防", "11血", "2CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/0/0a/aq1h2scidws8c9lekzpkcofkruyu4no.png/100px-UT_Hero_RolePhoto_301.png",
        "name": "超天酱:超绝最可爱天使酱",
        "color": 5,
        "related": ["辅助", "钱辅", "星光", "联动", "0攻", "1防", "9血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/c/c4/l7jch9c54yb98coz2op06yd8a9kuuky.png/100px-UT_Hero_RolePhoto_302.png",
        "name": "糖糖:主播女孩",
        "color": 4,
        "related": ["物理", "联动", "1攻", "4防", "8血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/5/55/9k5sw0zroeh2vjd2bky20pjg7x1h361.png/100px-UT_Hero_RolePhoto_303.png",
        "name": "吉尔:吉尔·斯汀雷",
        "color": 2,
        "related": ["辅助", "奶辅", "功能辅", "联动", "1攻", "1防", "10血", "3CD"]
    },
    {
        "icon": "https://patchwiki.biligame.com/images/starengine/thumb/b/b8/ltx3ievbibmt4j5f1zsj9iuzqt8q2rq.png/100px-UT_Hero_RolePhoto_304.png",
        "name": "多萝西:多萝西·海兹",
        "color": 0,
        "related": ["物理", "联动", "1攻", "0防", "8血", "2CD"]
    }
]
var color = [
    "红", "黄", "蓝", "绿", "黑", "白"
]
var colorCode = [
    "#ff6b6b",
    "#ffd166",
    "#45b7d1",
    "#06d6a0",
    "#000000",
    "#cccccc"
]

var aLabel = {
    1: "幽魂暗巷", 2: "龙宫游乐园", 3: "魔法学院",
    4: "水乡古镇", 5: "御魂庆典", 6: "星趴·梦想号"
};

var bLabel = {
    1: "普通", 2: "困难", 3: "噩梦", 4: "疯狂"
};

/**
 * @type {({name:string,icon:string}|string)[]}
 */
var tags = [
    "物理", "魔法", "辅助", "奶辅", "钱辅", "功能辅", "星光", "标记", "治愈", "一期", "二期", "三期", "联动",
    "0攻","1攻","2攻",
    "0防","1防","2防",
    "8血","9血","10血",
    ,"2CD","3CD","4CD"

]