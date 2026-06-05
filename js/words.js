/*
  词库数据表：单词 ID 使用 4 位大写字母+数字的顺序码，方便在 Excel 里维护。
  维护规则：修改单词内容时不要改 id；删除单词时把 active 改为 false，并把 id 追加到 RETIRED_WORD_IDS；新增单词按最后一个 ID 顺序递增。
*/
window.RETIRED_WORD_IDS = [];
window.JP_WORDS = [
  {
    "id": "0001",
    "word": "丈夫",
    "reading": "じょうぶ",
    "tone": "0",
    "pos": "[形2]",
    "meaning": "健康，健壮；结实",
    "sourceIndex": 1,
    "active": true
  },
  {
    "id": "0002",
    "word": "うるさい",
    "reading": "うるさい",
    "tone": "3",
    "pos": "[形1]",
    "meaning": "讨厌，使人心烦；吵得慌",
    "sourceIndex": 2,
    "active": true
  },
  {
    "id": "0003",
    "word": "我慢",
    "reading": "がまん",
    "tone": "1",
    "pos": "[名·他动3]",
    "meaning": "忍耐，忍受",
    "sourceIndex": 3,
    "active": true
  },
  {
    "id": "0004",
    "word": "点を入れる",
    "reading": "てんをいれる",
    "tone": "1+0",
    "pos": "[词组]",
    "meaning": "体育比赛等得分",
    "sourceIndex": 4,
    "active": true
  },
  {
    "id": "0005",
    "word": "チーム",
    "reading": "チーム",
    "tone": "1",
    "pos": "[名]",
    "meaning": "队，组",
    "sourceIndex": 5,
    "active": true
  },
  {
    "id": "0006",
    "word": "強い",
    "reading": "つよい",
    "tone": "2",
    "pos": "[形]",
    "meaning": "强劲的，强壮",
    "sourceIndex": 6,
    "active": true
  },
  {
    "id": "0007",
    "word": "おめでとう",
    "reading": "おめでとう",
    "tone": "0",
    "pos": "[感]",
    "meaning": "恭喜",
    "sourceIndex": 7,
    "active": true
  },
  {
    "id": "0008",
    "word": "ゴールを決める",
    "reading": "ゴールをきめる",
    "tone": "1+0",
    "pos": "[词组]",
    "meaning": "体育比赛中进球获胜",
    "sourceIndex": 8,
    "active": true
  },
  {
    "id": "0009",
    "word": "調子",
    "reading": "ちょうし",
    "tone": "0",
    "pos": "[名]",
    "meaning": "状态，情形",
    "sourceIndex": 9,
    "active": true
  },
  {
    "id": "000A",
    "word": "一部",
    "reading": "-ぶ",
    "tone": "",
    "pos": "[后缀]",
    "meaning": "部",
    "sourceIndex": 10,
    "active": true
  },
  {
    "id": "000B",
    "word": "足",
    "reading": "あし",
    "tone": "2",
    "pos": "[名]",
    "meaning": "脚",
    "sourceIndex": 11,
    "active": true
  },
  {
    "id": "000C",
    "word": "代わり",
    "reading": "かわり",
    "tone": "0",
    "pos": "[名]",
    "meaning": "代替，代理；替换",
    "sourceIndex": 12,
    "active": true
  },
  {
    "id": "000D",
    "word": "卓球",
    "reading": "たっきゅう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "乒乓球",
    "sourceIndex": 13,
    "active": true
  },
  {
    "id": "000E",
    "word": "フットボール",
    "reading": "フットボール",
    "tone": "4",
    "pos": "[名]",
    "meaning": "足球",
    "sourceIndex": 14,
    "active": true
  },
  {
    "id": "000F",
    "word": "相撲",
    "reading": "すもう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "相扑",
    "sourceIndex": 15,
    "active": true
  },
  {
    "id": "000G",
    "word": "プロ",
    "reading": "プロ",
    "tone": "1",
    "pos": "[名]",
    "meaning": "专业，职业",
    "sourceIndex": 16,
    "active": true
  },
  {
    "id": "000H",
    "word": "シーズン",
    "reading": "シーズン",
    "tone": "1",
    "pos": "[名]",
    "meaning": "赛季；季节；旺季",
    "sourceIndex": 17,
    "active": true
  },
  {
    "id": "000I",
    "word": "様子",
    "reading": "ようす",
    "tone": "0",
    "pos": "[名]",
    "meaning": "情况",
    "sourceIndex": 18,
    "active": true
  },
  {
    "id": "000J",
    "word": "中継",
    "reading": "ちゅうけい",
    "tone": "0",
    "pos": "[名·他动3]",
    "meaning": "转播",
    "sourceIndex": 19,
    "active": true
  },
  {
    "id": "000K",
    "word": "国民的",
    "reading": "こくみんてき",
    "tone": "0",
    "pos": "[形2]",
    "meaning": "国民的；国民性的",
    "sourceIndex": 20,
    "active": true
  },
  {
    "id": "000L",
    "word": "バスケットボール",
    "reading": "バスケットボール",
    "tone": "3",
    "pos": "[名]",
    "meaning": "篮球",
    "sourceIndex": 21,
    "active": true
  },
  {
    "id": "000M",
    "word": "それでも",
    "reading": "それでも",
    "tone": "3",
    "pos": "[接]",
    "meaning": "尽管如此，即使那样 还是……",
    "sourceIndex": 22,
    "active": true
  },
  {
    "id": "000N",
    "word": "卓球台",
    "reading": "たっきゅうだい",
    "tone": "0",
    "pos": "[名]",
    "meaning": "乒乓球台",
    "sourceIndex": 23,
    "active": true
  },
  {
    "id": "000O",
    "word": "オリンピック",
    "reading": "オリンピック",
    "tone": "4",
    "pos": "[名]",
    "meaning": "奥林匹克",
    "sourceIndex": 24,
    "active": true
  },
  {
    "id": "000P",
    "word": "ファン",
    "reading": "ファン",
    "tone": "1",
    "pos": "[名]",
    "meaning": "~迷，支持者",
    "sourceIndex": 25,
    "active": true
  },
  {
    "id": "000Q",
    "word": "関心",
    "reading": "かんしん",
    "tone": "0",
    "pos": "[名]",
    "meaning": "关心，感兴趣",
    "sourceIndex": 26,
    "active": true
  },
  {
    "id": "000R",
    "word": "競争",
    "reading": "きょうそう",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "竞争，竞赛",
    "sourceIndex": 27,
    "active": true
  },
  {
    "id": "000S",
    "word": "本来",
    "reading": "ほんらい",
    "tone": "1",
    "pos": "[名]",
    "meaning": "本来，原来",
    "sourceIndex": 28,
    "active": true
  },
  {
    "id": "000T",
    "word": "意義",
    "reading": "いぎ",
    "tone": "1",
    "pos": "[名]",
    "meaning": "意义，价值",
    "sourceIndex": 29,
    "active": true
  },
  {
    "id": "000U",
    "word": "人々",
    "reading": "ひとびと",
    "tone": "2",
    "pos": "[名]",
    "meaning": "人们，人人，大家",
    "sourceIndex": 30,
    "active": true
  },
  {
    "id": "000V",
    "word": "促進",
    "reading": "そくしん",
    "tone": "0",
    "pos": "[他动3]",
    "meaning": "促进",
    "sourceIndex": 31,
    "active": true
  },
  {
    "id": "000W",
    "word": "ヨーロッパ",
    "reading": "ヨーロッパ",
    "tone": "3",
    "pos": "[专]",
    "meaning": "欧洲",
    "sourceIndex": 32,
    "active": true
  },
  {
    "id": "000X",
    "word": "におい",
    "reading": "におい",
    "tone": "2",
    "pos": "[名]",
    "meaning": "气味；香味，香气；臭味，臭气",
    "sourceIndex": 33,
    "active": true
  },
  {
    "id": "000Y",
    "word": "まじめ",
    "reading": "まじめ",
    "tone": "0",
    "pos": "[名?形2]",
    "meaning": "认真；诚实",
    "sourceIndex": 34,
    "active": true
  },
  {
    "id": "000Z",
    "word": "つらい",
    "reading": "つらい",
    "tone": "2",
    "pos": "[形1]",
    "meaning": "苦，痛苦，艰苦",
    "sourceIndex": 35,
    "active": true
  },
  {
    "id": "0010",
    "word": "使える",
    "reading": "つかえる",
    "tone": "0",
    "pos": "[自动2]",
    "meaning": "能用，可以使用",
    "sourceIndex": 36,
    "active": true
  },
  {
    "id": "0011",
    "word": "返事",
    "reading": "へんじ",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "答应，回答；回信",
    "sourceIndex": 37,
    "active": true
  },
  {
    "id": "0012",
    "word": "文学者",
    "reading": "ぶんがくしゃ",
    "tone": "3",
    "pos": "[名]",
    "meaning": "文学家",
    "sourceIndex": 38,
    "active": true
  },
  {
    "id": "0013",
    "word": "評価",
    "reading": "ひょうか",
    "tone": "1",
    "pos": "[名·他动3]",
    "meaning": "评价",
    "sourceIndex": 39,
    "active": true
  },
  {
    "id": "0014",
    "word": "並ぶ",
    "reading": "ならぶ",
    "tone": "3, 0",
    "pos": "[自动1]",
    "meaning": "并排，排列；排队",
    "sourceIndex": 40,
    "active": true
  },
  {
    "id": "0015",
    "word": "デジカメ",
    "reading": "デジカメ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "（「デジタル?カメラ」的缩略语）数码相机",
    "sourceIndex": 41,
    "active": true
  },
  {
    "id": "0016",
    "word": "用事",
    "reading": "ようじ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "事，事情",
    "sourceIndex": 42,
    "active": true
  },
  {
    "id": "0017",
    "word": "体調",
    "reading": "たいちょう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "健康状态，身体条件",
    "sourceIndex": 43,
    "active": true
  },
  {
    "id": "0018",
    "word": "奥さん",
    "reading": "おくさん",
    "tone": "1",
    "pos": "[名]",
    "meaning": "妻子",
    "sourceIndex": 44,
    "active": true
  },
  {
    "id": "0019",
    "word": "高校",
    "reading": "こうこう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "高中",
    "sourceIndex": 45,
    "active": true
  },
  {
    "id": "001A",
    "word": "景色",
    "reading": "けしき",
    "tone": "1",
    "pos": "[名]",
    "meaning": "景色，风景",
    "sourceIndex": 46,
    "active": true
  },
  {
    "id": "001B",
    "word": "君",
    "reading": "きみ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "你",
    "sourceIndex": 47,
    "active": true
  },
  {
    "id": "001C",
    "word": "空く",
    "reading": "あく",
    "tone": "2, 0",
    "pos": "[自动1]",
    "meaning": "空；闲",
    "sourceIndex": 48,
    "active": true
  },
  {
    "id": "001D",
    "word": "座る",
    "reading": "すわる",
    "tone": "1",
    "pos": "[自动1]",
    "meaning": "坐，跪坐",
    "sourceIndex": 49,
    "active": true
  },
  {
    "id": "001E",
    "word": "優先席",
    "reading": "ゆうせんせき",
    "tone": "3",
    "pos": "[名]",
    "meaning": "优先座位，爱心座位",
    "sourceIndex": 50,
    "active": true
  },
  {
    "id": "001F",
    "word": "混む",
    "reading": "こむ",
    "tone": "1",
    "pos": "[自动1]",
    "meaning": "拥挤，混杂",
    "sourceIndex": 51,
    "active": true
  },
  {
    "id": "001G",
    "word": "なるほど",
    "reading": "なるほど",
    "tone": "0",
    "pos": "[感]",
    "meaning": "的确，确实，果然",
    "sourceIndex": 52,
    "active": true
  },
  {
    "id": "001H",
    "word": "気分",
    "reading": "きぶん",
    "tone": "1",
    "pos": "[名]",
    "meaning": "心情，感觉",
    "sourceIndex": 53,
    "active": true
  },
  {
    "id": "001I",
    "word": "偶に",
    "reading": "たまに",
    "tone": "1",
    "pos": "[副]",
    "meaning": "有时，偶尔",
    "sourceIndex": 54,
    "active": true
  },
  {
    "id": "001J",
    "word": "こういう",
    "reading": "こういう",
    "tone": "0",
    "pos": "[连体]",
    "meaning": "这种，这样的",
    "sourceIndex": 55,
    "active": true
  },
  {
    "id": "001K",
    "word": "リフレッシュ",
    "reading": "リフレッシュ",
    "tone": "3",
    "pos": "[名·他动3]",
    "meaning": "放松，恢复精神，振作",
    "sourceIndex": 56,
    "active": true
  },
  {
    "id": "001L",
    "word": "確か",
    "reading": "たしか",
    "tone": "1",
    "pos": "[形2]",
    "meaning": "确实，的确；可靠",
    "sourceIndex": 57,
    "active": true
  },
  {
    "id": "001M",
    "word": "確か",
    "reading": "たしか",
    "tone": "1",
    "pos": "[副]",
    "meaning": "似乎，大概",
    "sourceIndex": 58,
    "active": true
  },
  {
    "id": "001N",
    "word": "こんな",
    "reading": "こんな",
    "tone": "0",
    "pos": "[连体]",
    "meaning": "这样的",
    "sourceIndex": 59,
    "active": true
  },
  {
    "id": "001O",
    "word": "ごみ",
    "reading": "ごみ",
    "tone": "2",
    "pos": "[名]",
    "meaning": "垃圾，尘埃，灰尘",
    "sourceIndex": 60,
    "active": true
  },
  {
    "id": "001P",
    "word": "吸い殻",
    "reading": "すいがら",
    "tone": "0",
    "pos": "[名]",
    "meaning": "烟蒂，烟头",
    "sourceIndex": 61,
    "active": true
  },
  {
    "id": "001Q",
    "word": "空き缶",
    "reading": "あきかん",
    "tone": "0",
    "pos": "[名]",
    "meaning": "空罐，空易拉罐",
    "sourceIndex": 62,
    "active": true
  },
  {
    "id": "001R",
    "word": "もったいない",
    "reading": "もったいない",
    "tone": "5",
    "pos": "[形1]",
    "meaning": "可惜，浪费，糟蹋掉",
    "sourceIndex": 63,
    "active": true
  },
  {
    "id": "001S",
    "word": "郊外",
    "reading": "こうがい",
    "tone": "1",
    "pos": "[名]",
    "meaning": "郊外",
    "sourceIndex": 64,
    "active": true
  },
  {
    "id": "001T",
    "word": "ところが",
    "reading": "ところが",
    "tone": "3",
    "pos": "[接]",
    "meaning": "可是，不过，但是",
    "sourceIndex": 65,
    "active": true
  },
  {
    "id": "001U",
    "word": "あちらこちら",
    "reading": "あちらこちら",
    "tone": "4",
    "pos": "[代]",
    "meaning": "到处，四处",
    "sourceIndex": 66,
    "active": true
  },
  {
    "id": "001V",
    "word": "身近",
    "reading": "みぢか",
    "tone": "2",
    "pos": "[名?形2]",
    "meaning": "身边；切身",
    "sourceIndex": 67,
    "active": true
  },
  {
    "id": "001W",
    "word": "例えば",
    "reading": "たとえば",
    "tone": "2",
    "pos": "[副]",
    "meaning": "比如，例如；假设，假定",
    "sourceIndex": 68,
    "active": true
  },
  {
    "id": "001X",
    "word": "座席",
    "reading": "ざせき",
    "tone": "1",
    "pos": "[名]",
    "meaning": "座位，坐席",
    "sourceIndex": 69,
    "active": true
  },
  {
    "id": "001Y",
    "word": "多少",
    "reading": "たしょう",
    "tone": "0",
    "pos": "[副]",
    "meaning": "多少；稍微，一些",
    "sourceIndex": 70,
    "active": true
  },
  {
    "id": "001Z",
    "word": "周り",
    "reading": "まわり",
    "tone": "0",
    "pos": "[名]",
    "meaning": "周围；附近",
    "sourceIndex": 71,
    "active": true
  },
  {
    "id": "0020",
    "word": "それぞれ",
    "reading": "それぞれ",
    "tone": "2, 3",
    "pos": "[名?副]",
    "meaning": "各个，各自",
    "sourceIndex": 72,
    "active": true
  },
  {
    "id": "0021",
    "word": "行動",
    "reading": "こうどう",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "行动；行为",
    "sourceIndex": 73,
    "active": true
  },
  {
    "id": "0022",
    "word": "仕方",
    "reading": "しかた",
    "tone": "0",
    "pos": "[名]",
    "meaning": "做法，方式；行为，举止",
    "sourceIndex": 74,
    "active": true
  },
  {
    "id": "0023",
    "word": "お互い",
    "reading": "おたがい",
    "tone": "0",
    "pos": "[副]",
    "meaning": "彼此，互相",
    "sourceIndex": 75,
    "active": true
  },
  {
    "id": "0024",
    "word": "まるで",
    "reading": "まるで",
    "tone": "0",
    "pos": "[副]",
    "meaning": "完全，全然；好像",
    "sourceIndex": 76,
    "active": true
  },
  {
    "id": "0025",
    "word": "数学",
    "reading": "すうがく",
    "tone": "0",
    "pos": "[名]",
    "meaning": "数学",
    "sourceIndex": 77,
    "active": true
  },
  {
    "id": "0026",
    "word": "捨てる",
    "reading": "すてる",
    "tone": "0",
    "pos": "[他动2]",
    "meaning": "抛弃，扔掉",
    "sourceIndex": 78,
    "active": true
  },
  {
    "id": "0027",
    "word": "弁当",
    "reading": "べんとう",
    "tone": "3",
    "pos": "[名]",
    "meaning": "盒饭",
    "sourceIndex": 79,
    "active": true
  },
  {
    "id": "0028",
    "word": "甘い",
    "reading": "あまい",
    "tone": "2",
    "pos": "[形1]",
    "meaning": "甜；乐观，天真；不严厉",
    "sourceIndex": 80,
    "active": true
  },
  {
    "id": "0029",
    "word": "講義",
    "reading": "こうぎ",
    "tone": "1, 3",
    "pos": "[名?他动3]",
    "meaning": "讲义；讲解",
    "sourceIndex": 81,
    "active": true
  },
  {
    "id": "002A",
    "word": "娘",
    "reading": "むすめ",
    "tone": "3",
    "pos": "[名]",
    "meaning": "女儿",
    "sourceIndex": 82,
    "active": true
  },
  {
    "id": "002B",
    "word": "作者",
    "reading": "さくしゃ",
    "tone": "1",
    "pos": "[名]",
    "meaning": "作者",
    "sourceIndex": 83,
    "active": true
  },
  {
    "id": "002C",
    "word": "代表",
    "reading": "だいひょう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "代表",
    "sourceIndex": 84,
    "active": true
  },
  {
    "id": "002D",
    "word": "ずっと",
    "reading": "ずっと",
    "tone": "3, 0",
    "pos": "[副]",
    "meaning": "一直，始终；很",
    "sourceIndex": 85,
    "active": true
  },
  {
    "id": "002E",
    "word": "通常版",
    "reading": "つうじょうばん",
    "tone": "5",
    "pos": "[名]",
    "meaning": "普通版",
    "sourceIndex": 86,
    "active": true
  },
  {
    "id": "002F",
    "word": "文庫版",
    "reading": "ぶんこばん",
    "tone": "0",
    "pos": "[名]",
    "meaning": "袖珍本，普及性的小开本书籍",
    "sourceIndex": 87,
    "active": true
  },
  {
    "id": "002G",
    "word": "スペースをとる",
    "reading": "スペースをとる",
    "tone": "2, 0 + 1",
    "pos": "[词组]",
    "meaning": "占空间",
    "sourceIndex": 88,
    "active": true
  },
  {
    "id": "002H",
    "word": "縮み志向",
    "reading": "ちぢみしこう",
    "tone": "0",
    "pos": "[词组]",
    "meaning": "缩小倾向",
    "sourceIndex": 89,
    "active": true
  },
  {
    "id": "002I",
    "word": "世界的",
    "reading": "せかいてき",
    "tone": "0",
    "pos": "[形2]",
    "meaning": "全世界的",
    "sourceIndex": 90,
    "active": true
  },
  {
    "id": "002J",
    "word": "初日",
    "reading": "しょにち",
    "tone": "0",
    "pos": "[名]",
    "meaning": "第一天",
    "sourceIndex": 91,
    "active": true
  },
  {
    "id": "002K",
    "word": "列を作る",
    "reading": "れつをつくる",
    "tone": "1+2",
    "pos": "[词组]",
    "meaning": "排队",
    "sourceIndex": 92,
    "active": true
  },
  {
    "id": "002L",
    "word": "次回作",
    "reading": "じかいさく",
    "tone": "1",
    "pos": "[名]",
    "meaning": "下回作品",
    "sourceIndex": 93,
    "active": true
  },
  {
    "id": "002M",
    "word": "つもり",
    "reading": "つもり",
    "tone": "0",
    "pos": "[名]",
    "meaning": "打算，意图",
    "sourceIndex": 94,
    "active": true
  },
  {
    "id": "002N",
    "word": "大国",
    "reading": "たいこく",
    "tone": "0",
    "pos": "[名]",
    "meaning": "大国",
    "sourceIndex": 95,
    "active": true
  },
  {
    "id": "002O",
    "word": "残る",
    "reading": "のこる",
    "tone": "2",
    "pos": "[自动1]",
    "meaning": "留下，留传；剩下",
    "sourceIndex": 96,
    "active": true
  },
  {
    "id": "002P",
    "word": "名作",
    "reading": "めいさく",
    "tone": "0",
    "pos": "[名]",
    "meaning": "名作，名著",
    "sourceIndex": 97,
    "active": true
  },
  {
    "id": "002Q",
    "word": "作品",
    "reading": "さくひん",
    "tone": "0",
    "pos": "[名]",
    "meaning": "作品，艺术作品",
    "sourceIndex": 98,
    "active": true
  },
  {
    "id": "002R",
    "word": "代表作",
    "reading": "だいひょうさく",
    "tone": "3",
    "pos": "[名]",
    "meaning": "代表作",
    "sourceIndex": 99,
    "active": true
  },
  {
    "id": "002S",
    "word": "好評",
    "reading": "こうひょう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "好评，赞扬",
    "sourceIndex": 100,
    "active": true
  },
  {
    "id": "002T",
    "word": "主人公",
    "reading": "しゅじんこう",
    "tone": "2",
    "pos": "[名]",
    "meaning": "主角，主人公",
    "sourceIndex": 101,
    "active": true
  },
  {
    "id": "002U",
    "word": "受賞",
    "reading": "じゅしょう",
    "tone": "0",
    "pos": "[名?自他动3]",
    "meaning": "获奖，得奖",
    "sourceIndex": 102,
    "active": true
  },
  {
    "id": "002V",
    "word": "これら",
    "reading": "これら",
    "tone": "3",
    "pos": "[代]",
    "meaning": "这些",
    "sourceIndex": 103,
    "active": true
  },
  {
    "id": "002W",
    "word": "せっかく",
    "reading": "せっかく",
    "tone": "4, 0",
    "pos": "[副]",
    "meaning": "好不容易，特意；煞费苦心",
    "sourceIndex": 104,
    "active": true
  },
  {
    "id": "002X",
    "word": "もっと",
    "reading": "もっと",
    "tone": "1",
    "pos": "[副]",
    "meaning": "更，更加，进一步",
    "sourceIndex": 105,
    "active": true
  },
  {
    "id": "002Y",
    "word": "理解",
    "reading": "りかい",
    "tone": "1",
    "pos": "[名?他动3]",
    "meaning": "理解，弄懂；谅解，体谅",
    "sourceIndex": 106,
    "active": true
  },
  {
    "id": "002Z",
    "word": "繋がる",
    "reading": "つながる",
    "tone": "4, 0",
    "pos": "[自动1]",
    "meaning": "衔接，相连；排列",
    "sourceIndex": 107,
    "active": true
  },
  {
    "id": "0030",
    "word": "天婦羅",
    "reading": "てんぷら",
    "tone": "0",
    "pos": "[名]",
    "meaning": "天妇罗",
    "sourceIndex": 108,
    "active": true
  },
  {
    "id": "0031",
    "word": "刺身",
    "reading": "さしみ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "生鱼片",
    "sourceIndex": 109,
    "active": true
  },
  {
    "id": "0032",
    "word": "就職",
    "reading": "しゅうしょく",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "就职，就业，找到工作",
    "sourceIndex": 110,
    "active": true
  },
  {
    "id": "0033",
    "word": "たぶん",
    "reading": "たぶん",
    "tone": "1",
    "pos": "[副]",
    "meaning": "大概，或许",
    "sourceIndex": 111,
    "active": true
  },
  {
    "id": "0034",
    "word": "ゲーム",
    "reading": "ゲーム",
    "tone": "1",
    "pos": "[名]",
    "meaning": "竞技，比赛；游戏",
    "sourceIndex": 112,
    "active": true
  },
  {
    "id": "0035",
    "word": "中学生",
    "reading": "ちゅうがくせい",
    "tone": "3, 4",
    "pos": "[名]",
    "meaning": "初中生",
    "sourceIndex": 113,
    "active": true
  },
  {
    "id": "0036",
    "word": "番組",
    "reading": "ばんぐみ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "节目",
    "sourceIndex": 114,
    "active": true
  },
  {
    "id": "0037",
    "word": "お土産",
    "reading": "おみやげ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "特产，土产",
    "sourceIndex": 115,
    "active": true
  },
  {
    "id": "0038",
    "word": "遅刻",
    "reading": "ちこく",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "迟到",
    "sourceIndex": 116,
    "active": true
  },
  {
    "id": "0039",
    "word": "受賞作",
    "reading": "じゅしょうさく",
    "tone": "4",
    "pos": "[名]",
    "meaning": "获奖作品",
    "sourceIndex": 117,
    "active": true
  },
  {
    "id": "003A",
    "word": "気温",
    "reading": "きおん",
    "tone": "0",
    "pos": "[名]",
    "meaning": "气温",
    "sourceIndex": 118,
    "active": true
  },
  {
    "id": "003B",
    "word": "下手の横好き",
    "reading": "へたのよこずき",
    "tone": "0",
    "pos": "[词组]",
    "meaning": "不擅长但爱好",
    "sourceIndex": 119,
    "active": true
  },
  {
    "id": "003C",
    "word": "習う",
    "reading": "ならう",
    "tone": "2",
    "pos": "[他动1]",
    "meaning": "学习；练习",
    "sourceIndex": 120,
    "active": true
  },
  {
    "id": "003D",
    "word": "陶芸",
    "reading": "とうげい",
    "tone": "0",
    "pos": "[名]",
    "meaning": "制作陶器，陶器工艺",
    "sourceIndex": 121,
    "active": true
  },
  {
    "id": "003E",
    "word": "日曜大工",
    "reading": "にちようだいく",
    "tone": "5",
    "pos": "[名]",
    "meaning": "星期天木工",
    "sourceIndex": 122,
    "active": true
  },
  {
    "id": "003F",
    "word": "ビデオ",
    "reading": "ビデオ",
    "tone": "1",
    "pos": "[名]",
    "meaning": "录像",
    "sourceIndex": 123,
    "active": true
  },
  {
    "id": "003G",
    "word": "撮影",
    "reading": "さつえい",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "摄影，拍照",
    "sourceIndex": 124,
    "active": true
  },
  {
    "id": "003H",
    "word": "中学校",
    "reading": "ちゅうがっこう",
    "tone": "3",
    "pos": "[名]",
    "meaning": "中学，初中",
    "sourceIndex": 125,
    "active": true
  },
  {
    "id": "003I",
    "word": "頃",
    "reading": "ころ",
    "tone": "1",
    "pos": "[名]",
    "meaning": "时期，时候",
    "sourceIndex": 126,
    "active": true
  },
  {
    "id": "003J",
    "word": "続ける",
    "reading": "つづける",
    "tone": "4, 0",
    "pos": "[他动2]",
    "meaning": "继续，持续，连续不断",
    "sourceIndex": 127,
    "active": true
  },
  {
    "id": "003K",
    "word": "才能",
    "reading": "さいのう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "才能，才干",
    "sourceIndex": 128,
    "active": true
  },
  {
    "id": "003L",
    "word": "興味深い",
    "reading": "きょうみぶかい",
    "tone": "4",
    "pos": "[形1]",
    "meaning": "很感兴趣，兴致十足",
    "sourceIndex": 129,
    "active": true
  },
  {
    "id": "003M",
    "word": "素晴らしい",
    "reading": "すばらしい",
    "tone": "4",
    "pos": "[形1]",
    "meaning": "出色的，优秀的，极好的",
    "sourceIndex": 130,
    "active": true
  },
  {
    "id": "003N",
    "word": "ストレス",
    "reading": "ストレス",
    "tone": "2",
    "pos": "[名]",
    "meaning": "精神紧张",
    "sourceIndex": 131,
    "active": true
  },
  {
    "id": "003O",
    "word": "発散",
    "reading": "はっさん",
    "tone": "0",
    "pos": "[名?自他动3]",
    "meaning": "释放，消散，散发",
    "sourceIndex": 132,
    "active": true
  },
  {
    "id": "003P",
    "word": "通す",
    "reading": "とおす",
    "tone": "1",
    "pos": "[他动1]",
    "meaning": "通过；通行；让进",
    "sourceIndex": 133,
    "active": true
  },
  {
    "id": "003Q",
    "word": "教養",
    "reading": "きょうよう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "修养，教养",
    "sourceIndex": 134,
    "active": true
  },
  {
    "id": "003R",
    "word": "高める",
    "reading": "たかめる",
    "tone": "3",
    "pos": "[他动2]",
    "meaning": "提高，提升；增强",
    "sourceIndex": 135,
    "active": true
  },
  {
    "id": "003S",
    "word": "心身",
    "reading": "しんしん",
    "tone": "1",
    "pos": "[名]",
    "meaning": "身心",
    "sourceIndex": 136,
    "active": true
  },
  {
    "id": "003T",
    "word": "共に",
    "reading": "ともに",
    "tone": "3, 1",
    "pos": "[副]",
    "meaning": "俱，全，一起",
    "sourceIndex": 137,
    "active": true
  },
  {
    "id": "003U",
    "word": "プラス",
    "reading": "プラス",
    "tone": "0, 1",
    "pos": "[名?他动3]",
    "meaning": "益处，好处；加",
    "sourceIndex": 138,
    "active": true
  },
  {
    "id": "003V",
    "word": "豊か",
    "reading": "ゆたか",
    "tone": "1",
    "pos": "[形2]",
    "meaning": "富裕，丰富，充分",
    "sourceIndex": 139,
    "active": true
  },
  {
    "id": "003W",
    "word": "書道",
    "reading": "しょどう",
    "tone": "1",
    "pos": "[名]",
    "meaning": "书法",
    "sourceIndex": 140,
    "active": true
  },
  {
    "id": "003X",
    "word": "俳句",
    "reading": "はいく",
    "tone": "0",
    "pos": "[名]",
    "meaning": "俳句",
    "sourceIndex": 141,
    "active": true
  },
  {
    "id": "003Y",
    "word": "合唱",
    "reading": "がっしょう",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "合唱",
    "sourceIndex": 142,
    "active": true
  },
  {
    "id": "003Z",
    "word": "仲間",
    "reading": "なかま",
    "tone": "3",
    "pos": "[名]",
    "meaning": "朋友，伙伴，同事；同类（的东西）",
    "sourceIndex": 143,
    "active": true
  },
  {
    "id": "0040",
    "word": "減る",
    "reading": "へる",
    "tone": "0",
    "pos": "[自动1]",
    "meaning": "减，减少",
    "sourceIndex": 144,
    "active": true
  },
  {
    "id": "0041",
    "word": "雲",
    "reading": "くも",
    "tone": "1",
    "pos": "[名]",
    "meaning": "云，云彩",
    "sourceIndex": 145,
    "active": true
  },
  {
    "id": "0042",
    "word": "消える",
    "reading": "きえる",
    "tone": "3, 0",
    "pos": "[自动2]",
    "meaning": "消失",
    "sourceIndex": 146,
    "active": true
  },
  {
    "id": "0043",
    "word": "危ない",
    "reading": "あぶない",
    "tone": "3",
    "pos": "[形1]",
    "meaning": "危险，不安全；靠不住",
    "sourceIndex": 147,
    "active": true
  },
  {
    "id": "0044",
    "word": "付き合う",
    "reading": "つきあう",
    "tone": "3",
    "pos": "[自动1]",
    "meaning": "交际，交往，来往",
    "sourceIndex": 148,
    "active": true
  },
  {
    "id": "0045",
    "word": "北",
    "reading": "きた",
    "tone": "0",
    "pos": "[名]",
    "meaning": "北，北方",
    "sourceIndex": 149,
    "active": true
  },
  {
    "id": "0046",
    "word": "贈る",
    "reading": "おくる",
    "tone": "3, 0",
    "pos": "[他动1]",
    "meaning": "赠送，馈赠",
    "sourceIndex": 150,
    "active": true
  },
  {
    "id": "0047",
    "word": "村上春樹",
    "reading": "むらかみはるき",
    "tone": "",
    "pos": "[专]",
    "meaning": "（人名）村上春树",
    "sourceIndex": 151,
    "active": true
  },
  {
    "id": "0048",
    "word": "お礼",
    "reading": "おれい",
    "tone": "0",
    "pos": "[名]",
    "meaning": "礼，道谢；礼品；行礼",
    "sourceIndex": 152,
    "active": true
  },
  {
    "id": "0049",
    "word": "ペン",
    "reading": "ペン",
    "tone": "1",
    "pos": "[名]",
    "meaning": "钢笔",
    "sourceIndex": 153,
    "active": true
  },
  {
    "id": "004A",
    "word": "不自由",
    "reading": "ふじゆう",
    "tone": "1",
    "pos": "[形2]",
    "meaning": "不方便；不自由",
    "sourceIndex": 154,
    "active": true
  },
  {
    "id": "004B",
    "word": "感謝",
    "reading": "かんしゃ",
    "tone": "1",
    "pos": "[名?自动3]",
    "meaning": "感谢",
    "sourceIndex": 155,
    "active": true
  },
  {
    "id": "004C",
    "word": "あんなに",
    "reading": "あんなに",
    "tone": "0",
    "pos": "[副]",
    "meaning": "那么，那样地",
    "sourceIndex": 156,
    "active": true
  },
  {
    "id": "004D",
    "word": "あんまり",
    "reading": "あんまり",
    "tone": "4",
    "pos": "[副]",
    "meaning": "太，过于",
    "sourceIndex": 157,
    "active": true
  },
  {
    "id": "004E",
    "word": "大自然",
    "reading": "だいしぜん",
    "tone": "3",
    "pos": "[名]",
    "meaning": "大自然",
    "sourceIndex": 158,
    "active": true
  },
  {
    "id": "004F",
    "word": "感動",
    "reading": "かんどう",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "感动",
    "sourceIndex": 159,
    "active": true
  },
  {
    "id": "004G",
    "word": "何か",
    "reading": "なんか",
    "tone": "1",
    "pos": "[词组]",
    "meaning": "总觉得，不由得",
    "sourceIndex": 160,
    "active": true
  },
  {
    "id": "004H",
    "word": "特集",
    "reading": "とくしゅう",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "特辑，专刊，专集；报刊、杂志和电视台等以某特定问题和人物为中心编成的报道或节目等",
    "sourceIndex": 161,
    "active": true
  },
  {
    "id": "004I",
    "word": "途中",
    "reading": "とちゅう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "途中，半途，半道",
    "sourceIndex": 162,
    "active": true
  },
  {
    "id": "004J",
    "word": "眺める",
    "reading": "ながめる",
    "tone": "3",
    "pos": "[他动2]",
    "meaning": "眺望，远眺",
    "sourceIndex": 163,
    "active": true
  },
  {
    "id": "004K",
    "word": "シンボル",
    "reading": "シンボル",
    "tone": "1",
    "pos": "[名]",
    "meaning": "象征，标志",
    "sourceIndex": 164,
    "active": true
  },
  {
    "id": "004L",
    "word": "現代的",
    "reading": "げんだいてき",
    "tone": "1",
    "pos": "[形2]",
    "meaning": "现代的，现代型的",
    "sourceIndex": 165,
    "active": true
  },
  {
    "id": "004M",
    "word": "都市",
    "reading": "とし",
    "tone": "1",
    "pos": "[名]",
    "meaning": "都市，城市",
    "sourceIndex": 166,
    "active": true
  },
  {
    "id": "004N",
    "word": "広がる",
    "reading": "ひろがる",
    "tone": "4, 0",
    "pos": "[自动1]",
    "meaning": "扩大；伸展，开阔",
    "sourceIndex": 167,
    "active": true
  },
  {
    "id": "004O",
    "word": "-らしい",
    "reading": "-らしい",
    "tone": "",
    "pos": "[后缀]",
    "meaning": "像 样子",
    "sourceIndex": 168,
    "active": true
  },
  {
    "id": "004P",
    "word": "楽しめる",
    "reading": "たのしめる",
    "tone": "3, 0",
    "pos": "[自动2]",
    "meaning": "能享乐，能欣赏，值得欣赏",
    "sourceIndex": 169,
    "active": true
  },
  {
    "id": "004Q",
    "word": "日々",
    "reading": "ひび",
    "tone": "1",
    "pos": "[名]",
    "meaning": "每天，天天",
    "sourceIndex": 170,
    "active": true
  },
  {
    "id": "004R",
    "word": "求める",
    "reading": "もとめる",
    "tone": "3",
    "pos": "[他动2]",
    "meaning": "寻求，找；渴望，希望",
    "sourceIndex": 171,
    "active": true
  },
  {
    "id": "004S",
    "word": "のどか",
    "reading": "のどか",
    "tone": "1",
    "pos": "[形2]",
    "meaning": "悠闲，宁静；和煦，牧歌式的",
    "sourceIndex": 172,
    "active": true
  },
  {
    "id": "004T",
    "word": "素朴",
    "reading": "そぼく",
    "tone": "0",
    "pos": "[形2]",
    "meaning": "朴实，朴素；单纯，简单",
    "sourceIndex": 173,
    "active": true
  },
  {
    "id": "004U",
    "word": "想像",
    "reading": "そうぞう",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "想象",
    "sourceIndex": 174,
    "active": true
  },
  {
    "id": "004V",
    "word": "小川",
    "reading": "おがわ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "小河",
    "sourceIndex": 175,
    "active": true
  },
  {
    "id": "004W",
    "word": "兔",
    "reading": "うさぎ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "兔，兔子",
    "sourceIndex": 176,
    "active": true
  },
  {
    "id": "004X",
    "word": "典型的",
    "reading": "てんけいてき",
    "tone": "0",
    "pos": "[形2]",
    "meaning": "典型的",
    "sourceIndex": 177,
    "active": true
  },
  {
    "id": "004Y",
    "word": "イメージ",
    "reading": "イメージ",
    "tone": "2",
    "pos": "[名]",
    "meaning": "形象；印象",
    "sourceIndex": 178,
    "active": true
  },
  {
    "id": "004Z",
    "word": "言える",
    "reading": "いえる",
    "tone": "3, 0",
    "pos": "[自动2]",
    "meaning": "能说，可以说",
    "sourceIndex": 179,
    "active": true
  },
  {
    "id": "0050",
    "word": "個人",
    "reading": "こじん",
    "tone": "1",
    "pos": "[名]",
    "meaning": "个人",
    "sourceIndex": 180,
    "active": true
  },
  {
    "id": "0051",
    "word": "温泉地",
    "reading": "おんせんち",
    "tone": "4",
    "pos": "[名]",
    "meaning": "有温泉的地方",
    "sourceIndex": 181,
    "active": true
  },
  {
    "id": "0052",
    "word": "-狩り",
    "reading": "-がり",
    "tone": "1",
    "pos": "[后缀]",
    "meaning": "观赏……；采集……",
    "sourceIndex": 182,
    "active": true
  },
  {
    "id": "0053",
    "word": "生",
    "reading": "なま",
    "tone": "1",
    "pos": "[名?形2]",
    "meaning": "自然的，真实的，原汁原味的",
    "sourceIndex": 183,
    "active": true
  },
  {
    "id": "0054",
    "word": "触れる",
    "reading": "ふれる",
    "tone": "3, 0",
    "pos": "[自动2]",
    "meaning": "触，接触",
    "sourceIndex": 184,
    "active": true
  },
  {
    "id": "0055",
    "word": "鎌倉",
    "reading": "かまくら",
    "tone": "4",
    "pos": "[专]",
    "meaning": "镰仓市（地名）",
    "sourceIndex": 185,
    "active": true
  },
  {
    "id": "0056",
    "word": "箱根",
    "reading": "はこね",
    "tone": "3, 0",
    "pos": "[专]",
    "meaning": "箱根（地名）",
    "sourceIndex": 186,
    "active": true
  },
  {
    "id": "0057",
    "word": "おっしゃる",
    "reading": "おっしゃる",
    "tone": "3",
    "pos": "[他动1]",
    "meaning": "说，讲，称（的尊敬语）",
    "sourceIndex": 187,
    "active": true
  },
  {
    "id": "0058",
    "word": "正しい",
    "reading": "ただしい",
    "tone": "3",
    "pos": "[形1]",
    "meaning": "正确，正当，端正",
    "sourceIndex": 188,
    "active": true
  },
  {
    "id": "0059",
    "word": "貧しい",
    "reading": "まずしい",
    "tone": "3",
    "pos": "[形1]",
    "meaning": "贫穷；贫乏",
    "sourceIndex": 189,
    "active": true
  },
  {
    "id": "005A",
    "word": "明ける",
    "reading": "あける",
    "tone": "3, 0",
    "pos": "[自动2]",
    "meaning": "过年；明，亮",
    "sourceIndex": 190,
    "active": true
  },
  {
    "id": "005B",
    "word": "青",
    "reading": "あお",
    "tone": "1",
    "pos": "[名]",
    "meaning": "青，蓝；绿",
    "sourceIndex": 191,
    "active": true
  },
  {
    "id": "005C",
    "word": "口に合う",
    "reading": "くちにあう",
    "tone": "0+1",
    "pos": "[词组]",
    "meaning": "合口味",
    "sourceIndex": 192,
    "active": true
  },
  {
    "id": "005D",
    "word": "和服",
    "reading": "わふく",
    "tone": "0",
    "pos": "[名]",
    "meaning": "和服",
    "sourceIndex": 193,
    "active": true
  },
  {
    "id": "005E",
    "word": "今週中",
    "reading": "こんしゅうちゅう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "本周内",
    "sourceIndex": 194,
    "active": true
  },
  {
    "id": "005F",
    "word": "冷める",
    "reading": "さめる",
    "tone": "2",
    "pos": "[自动2]",
    "meaning": "变冷，凉；降低",
    "sourceIndex": 195,
    "active": true
  },
  {
    "id": "005G",
    "word": "確かめる",
    "reading": "たしかめる",
    "tone": "4",
    "pos": "[他动2]",
    "meaning": "弄清，查明",
    "sourceIndex": 196,
    "active": true
  },
  {
    "id": "005H",
    "word": "傘",
    "reading": "かさ",
    "tone": "1",
    "pos": "[名]",
    "meaning": "伞，雨伞",
    "sourceIndex": 197,
    "active": true
  },
  {
    "id": "005I",
    "word": "字",
    "reading": "じ",
    "tone": "1",
    "pos": "[名]",
    "meaning": "字，文字",
    "sourceIndex": 198,
    "active": true
  },
  {
    "id": "005J",
    "word": "説明",
    "reading": "せつめい",
    "tone": "0",
    "pos": "[名·他动3]",
    "meaning": "说明，解释",
    "sourceIndex": 199,
    "active": true
  },
  {
    "id": "005K",
    "word": "シャワー",
    "reading": "シャワー",
    "tone": "1",
    "pos": "[名]",
    "meaning": "淋浴",
    "sourceIndex": 200,
    "active": true
  },
  {
    "id": "005L",
    "word": "浴びる",
    "reading": "あびる",
    "tone": "2, 0",
    "pos": "[他动2]",
    "meaning": "淋，浴",
    "sourceIndex": 201,
    "active": true
  },
  {
    "id": "005M",
    "word": "どんどん",
    "reading": "どんどん",
    "tone": "1",
    "pos": "[副]",
    "meaning": "连续不断，顺利；旺盛",
    "sourceIndex": 202,
    "active": true
  },
  {
    "id": "005N",
    "word": "旅行先",
    "reading": "りょこうさき",
    "tone": "0",
    "pos": "[名]",
    "meaning": "旅行目的地",
    "sourceIndex": 203,
    "active": true
  },
  {
    "id": "005O",
    "word": "寮",
    "reading": "りょう",
    "tone": "1",
    "pos": "[名]",
    "meaning": "（学生）宿舍",
    "sourceIndex": 204,
    "active": true
  },
  {
    "id": "005P",
    "word": "一般的",
    "reading": "いっぱんてき",
    "tone": "0",
    "pos": "[形2]",
    "meaning": "一般性的",
    "sourceIndex": 205,
    "active": true
  },
  {
    "id": "005Q",
    "word": "へえ",
    "reading": "へえ",
    "tone": "1",
    "pos": "[感]",
    "meaning": "啊，哎，嘿",
    "sourceIndex": 206,
    "active": true
  },
  {
    "id": "005R",
    "word": "二段",
    "reading": "にだん",
    "tone": "1",
    "pos": "[名]",
    "meaning": "两层，双层",
    "sourceIndex": 207,
    "active": true
  },
  {
    "id": "005S",
    "word": "二段ベッド",
    "reading": "にだんベッド",
    "tone": "4",
    "pos": "[名]",
    "meaning": "双层床",
    "sourceIndex": 208,
    "active": true
  },
  {
    "id": "005T",
    "word": "実家",
    "reading": "じっか",
    "tone": "0",
    "pos": "[名]",
    "meaning": "父母家，自己出生的家",
    "sourceIndex": 209,
    "active": true
  },
  {
    "id": "005U",
    "word": "通う",
    "reading": "かよう",
    "tone": "0",
    "pos": "[自动1]",
    "meaning": "来往，通行",
    "sourceIndex": 210,
    "active": true
  },
  {
    "id": "005V",
    "word": "借りる",
    "reading": "かりる",
    "tone": "0",
    "pos": "[他动2]",
    "meaning": "借用，借助",
    "sourceIndex": 211,
    "active": true
  },
  {
    "id": "005W",
    "word": "一人暮らし",
    "reading": "ひとりぐらし",
    "tone": "4",
    "pos": "[名]",
    "meaning": "独立生活，一个人生活",
    "sourceIndex": 212,
    "active": true
  },
  {
    "id": "005X",
    "word": "共同",
    "reading": "きょうどう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "共同",
    "sourceIndex": 213,
    "active": true
  },
  {
    "id": "005Y",
    "word": "共同生活",
    "reading": "きょうどうせいかつ",
    "tone": "5",
    "pos": "[名]",
    "meaning": "集体生活",
    "sourceIndex": 214,
    "active": true
  },
  {
    "id": "005Z",
    "word": "晩",
    "reading": "ばん",
    "tone": "0",
    "pos": "[名]",
    "meaning": "晚上",
    "sourceIndex": 215,
    "active": true
  },
  {
    "id": "0060",
    "word": "~食",
    "reading": "しょく",
    "tone": "0",
    "pos": "[后缀]",
    "meaning": "餐，顿",
    "sourceIndex": 216,
    "active": true
  },
  {
    "id": "0061",
    "word": "出前",
    "reading": "でまえ",
    "tone": "1",
    "pos": "[名]",
    "meaning": "外卖",
    "sourceIndex": 217,
    "active": true
  },
  {
    "id": "0062",
    "word": "注文",
    "reading": "ちゅうもん",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "订货",
    "sourceIndex": 218,
    "active": true
  },
  {
    "id": "0063",
    "word": "お昼",
    "reading": "おひる",
    "tone": "2",
    "pos": "[名]",
    "meaning": "午饭；中午",
    "sourceIndex": 219,
    "active": true
  },
  {
    "id": "0064",
    "word": "特別",
    "reading": "とくべつ",
    "tone": "1",
    "pos": "[形2]",
    "meaning": "特别",
    "sourceIndex": 220,
    "active": true
  },
  {
    "id": "0065",
    "word": "特別",
    "reading": "とくべつ",
    "tone": "1",
    "pos": "[副]",
    "meaning": "特别，格外，尤其",
    "sourceIndex": 221,
    "active": true
  },
  {
    "id": "0066",
    "word": "除く",
    "reading": "のぞく",
    "tone": "0",
    "pos": "[他动1]",
    "meaning": "除了 之外",
    "sourceIndex": 222,
    "active": true
  },
  {
    "id": "0067",
    "word": "~内",
    "reading": "ない",
    "tone": "1",
    "pos": "[后缀]",
    "meaning": "内，在 内",
    "sourceIndex": 223,
    "active": true
  },
  {
    "id": "0068",
    "word": "便利",
    "reading": "べんり",
    "tone": "1",
    "pos": "[形2]",
    "meaning": "方便",
    "sourceIndex": 224,
    "active": true
  },
  {
    "id": "0069",
    "word": "不動産",
    "reading": "ふどうさん",
    "tone": "2, 0",
    "pos": "[名]",
    "meaning": "不动产",
    "sourceIndex": 225,
    "active": true
  },
  {
    "id": "006A",
    "word": "不動産会社",
    "reading": "ふどうさんがいしゃ",
    "tone": "6",
    "pos": "[名]",
    "meaning": "房地产公司",
    "sourceIndex": 226,
    "active": true
  },
  {
    "id": "006B",
    "word": "条件",
    "reading": "じょうけん",
    "tone": "3",
    "pos": "[名]",
    "meaning": "条件",
    "sourceIndex": 227,
    "active": true
  },
  {
    "id": "006C",
    "word": "絞り込む",
    "reading": "しぼりこむ",
    "tone": "4",
    "pos": "[他动1]",
    "meaning": "限定",
    "sourceIndex": 228,
    "active": true
  },
  {
    "id": "006D",
    "word": "仲介",
    "reading": "ちゅうかい",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "中介",
    "sourceIndex": 229,
    "active": true
  },
  {
    "id": "006E",
    "word": "手数料",
    "reading": "てすうりょう",
    "tone": "2",
    "pos": "[名]",
    "meaning": "佣金，手续费",
    "sourceIndex": 230,
    "active": true
  },
  {
    "id": "006F",
    "word": "割引",
    "reading": "わりびき",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "打折，折扣",
    "sourceIndex": 231,
    "active": true
  },
  {
    "id": "006G",
    "word": "無料",
    "reading": "むりょう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "免费",
    "sourceIndex": 232,
    "active": true
  },
  {
    "id": "006H",
    "word": "ケース",
    "reading": "ケース",
    "tone": "1",
    "pos": "[名]",
    "meaning": "情形，事例",
    "sourceIndex": 233,
    "active": true
  },
  {
    "id": "006I",
    "word": "費用",
    "reading": "ひよう",
    "tone": "1",
    "pos": "[名]",
    "meaning": "费用，开支",
    "sourceIndex": 234,
    "active": true
  },
  {
    "id": "006J",
    "word": "負担",
    "reading": "ふたん",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "负担",
    "sourceIndex": 235,
    "active": true
  },
  {
    "id": "006K",
    "word": "入居",
    "reading": "にゅうきょ",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "入住，迁入，搬进",
    "sourceIndex": 236,
    "active": true
  },
  {
    "id": "006L",
    "word": "トラブル",
    "reading": "トラブル",
    "tone": "2",
    "pos": "[名]",
    "meaning": "纠纷，故障",
    "sourceIndex": 237,
    "active": true
  },
  {
    "id": "006M",
    "word": "相談",
    "reading": "そうだん",
    "tone": "0",
    "pos": "[他动3]",
    "meaning": "商量，磋商",
    "sourceIndex": 238,
    "active": true
  },
  {
    "id": "006N",
    "word": "積極的",
    "reading": "せっきょくてき",
    "tone": "0",
    "pos": "[形2]",
    "meaning": "积极地",
    "sourceIndex": 239,
    "active": true
  },
  {
    "id": "006O",
    "word": "勧める",
    "reading": "すすめる",
    "tone": "0",
    "pos": "[他动2]",
    "meaning": "劝，劝告",
    "sourceIndex": 240,
    "active": true
  },
  {
    "id": "006P",
    "word": "大学生協",
    "reading": "だいがくせいきょう",
    "tone": "",
    "pos": "[专]",
    "meaning": "大学生协，大学生生活协同组织联合会。日文全称为「大学生活協同組合」",
    "sourceIndex": 241,
    "active": true
  },
  {
    "id": "006Q",
    "word": "楽器",
    "reading": "がっき",
    "tone": "0",
    "pos": "[名]",
    "meaning": "乐器",
    "sourceIndex": 242,
    "active": true
  },
  {
    "id": "006R",
    "word": "切符",
    "reading": "きっぷ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "票，票证",
    "sourceIndex": 243,
    "active": true
  },
  {
    "id": "006S",
    "word": "用意",
    "reading": "ようい",
    "tone": "1",
    "pos": "[名?他动3]",
    "meaning": "预备，准备",
    "sourceIndex": 244,
    "active": true
  },
  {
    "id": "006T",
    "word": "阿部",
    "reading": "あべ",
    "tone": "",
    "pos": "[专]",
    "meaning": "（姓）阿部",
    "sourceIndex": 245,
    "active": true
  },
  {
    "id": "006U",
    "word": "渡辺",
    "reading": "わたなべ",
    "tone": "",
    "pos": "[专]",
    "meaning": "（姓）渡边",
    "sourceIndex": 246,
    "active": true
  },
  {
    "id": "006V",
    "word": "石川",
    "reading": "いしかわ",
    "tone": "",
    "pos": "[专]",
    "meaning": "（姓）石川",
    "sourceIndex": 247,
    "active": true
  },
  {
    "id": "006W",
    "word": "伊藤",
    "reading": "いとう",
    "tone": "",
    "pos": "[专]",
    "meaning": "（姓）伊藤",
    "sourceIndex": 248,
    "active": true
  },
  {
    "id": "006X",
    "word": "小川",
    "reading": "おがわ",
    "tone": "",
    "pos": "[专]",
    "meaning": "（姓）小川",
    "sourceIndex": 249,
    "active": true
  },
  {
    "id": "006Y",
    "word": "小林",
    "reading": "こばやし",
    "tone": "",
    "pos": "[专]",
    "meaning": "（姓）小林",
    "sourceIndex": 250,
    "active": true
  },
  {
    "id": "006Z",
    "word": "山本",
    "reading": "やまもと",
    "tone": "",
    "pos": "[专]",
    "meaning": "（姓）山本",
    "sourceIndex": 251,
    "active": true
  },
  {
    "id": "0070",
    "word": "何だか",
    "reading": "なんだか",
    "tone": "1",
    "pos": "[副]",
    "meaning": "总觉得，不知为何",
    "sourceIndex": 252,
    "active": true
  },
  {
    "id": "0071",
    "word": "通学",
    "reading": "つうがく",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "走读；上学",
    "sourceIndex": 253,
    "active": true
  },
  {
    "id": "0072",
    "word": "タイヤ",
    "reading": "タイヤ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "轮胎",
    "sourceIndex": 254,
    "active": true
  },
  {
    "id": "0073",
    "word": "パンク",
    "reading": "パンク",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "爆胎",
    "sourceIndex": 255,
    "active": true
  },
  {
    "id": "0074",
    "word": "留学生会館",
    "reading": "りゅうがくせいかいかん",
    "tone": "7",
    "pos": "[名]",
    "meaning": "留学生会馆",
    "sourceIndex": 256,
    "active": true
  },
  {
    "id": "0075",
    "word": "会館",
    "reading": "かいかん",
    "tone": "0",
    "pos": "[名]",
    "meaning": "会馆",
    "sourceIndex": 257,
    "active": true
  },
  {
    "id": "0076",
    "word": "結局",
    "reading": "けっきょく",
    "tone": "0",
    "pos": "[名?副]",
    "meaning": "最后；到底，终究",
    "sourceIndex": 258,
    "active": true
  },
  {
    "id": "0077",
    "word": "シェアサイクル",
    "reading": "シェアサイクル",
    "tone": "3",
    "pos": "[名]",
    "meaning": "共享单车",
    "sourceIndex": 259,
    "active": true
  },
  {
    "id": "0078",
    "word": "レンタル",
    "reading": "レンタル",
    "tone": "1",
    "pos": "[名]",
    "meaning": "出租，租赁",
    "sourceIndex": 260,
    "active": true
  },
  {
    "id": "0079",
    "word": "レンタル自転車",
    "reading": "レンタルじてんしゃ",
    "tone": "6",
    "pos": "[名]",
    "meaning": "出租自行车",
    "sourceIndex": 261,
    "active": true
  },
  {
    "id": "007A",
    "word": "QRコード",
    "reading": "キューアールコード",
    "tone": "6",
    "pos": "[名]",
    "meaning": "二维码",
    "sourceIndex": 262,
    "active": true
  },
  {
    "id": "007B",
    "word": "コード",
    "reading": "コード",
    "tone": "1",
    "pos": "[名]",
    "meaning": "编码，电码",
    "sourceIndex": 263,
    "active": true
  },
  {
    "id": "007C",
    "word": "スキャン",
    "reading": "スキャン",
    "tone": "2",
    "pos": "[名?他动3]",
    "meaning": "扫描；搜索",
    "sourceIndex": 264,
    "active": true
  },
  {
    "id": "007D",
    "word": "助かる",
    "reading": "たすかる",
    "tone": "3",
    "pos": "[自动1]",
    "meaning": "得救，得到帮助",
    "sourceIndex": 265,
    "active": true
  },
  {
    "id": "007E",
    "word": "手段",
    "reading": "しゅだん",
    "tone": "1",
    "pos": "[名]",
    "meaning": "手段",
    "sourceIndex": 266,
    "active": true
  },
  {
    "id": "007F",
    "word": "発達",
    "reading": "はったつ",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "发达；进步",
    "sourceIndex": 267,
    "active": true
  },
  {
    "id": "007G",
    "word": "鉄道",
    "reading": "てつどう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "铁道，铁路",
    "sourceIndex": 268,
    "active": true
  },
  {
    "id": "007H",
    "word": "JR線",
    "reading": "ジェーアールせん",
    "tone": "0",
    "pos": "[专]",
    "meaning": "JR线",
    "sourceIndex": 269,
    "active": true
  },
  {
    "id": "007I",
    "word": "~線",
    "reading": "せん",
    "tone": "0",
    "pos": "[后缀]",
    "meaning": "～线",
    "sourceIndex": 270,
    "active": true
  },
  {
    "id": "007J",
    "word": "誇る",
    "reading": "ほこる",
    "tone": "2",
    "pos": "[他动1]",
    "meaning": "夸耀，以 为自豪",
    "sourceIndex": 271,
    "active": true
  },
  {
    "id": "007K",
    "word": "正確",
    "reading": "せいかく",
    "tone": "0",
    "pos": "[名?形2]",
    "meaning": "正确",
    "sourceIndex": 272,
    "active": true
  },
  {
    "id": "007L",
    "word": "運行",
    "reading": "うんこう",
    "tone": "0",
    "pos": "[自他动3]",
    "meaning": "运行",
    "sourceIndex": 273,
    "active": true
  },
  {
    "id": "007M",
    "word": "驚く",
    "reading": "おどろく",
    "tone": "3",
    "pos": "[自动1]",
    "meaning": "意想不到，惊讶",
    "sourceIndex": 274,
    "active": true
  },
  {
    "id": "007N",
    "word": "限り",
    "reading": "かぎり",
    "tone": "1",
    "pos": "[名]",
    "meaning": "限度，界限",
    "sourceIndex": 275,
    "active": true
  },
  {
    "id": "007O",
    "word": "時刻表",
    "reading": "じこくひょう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "时刻表",
    "sourceIndex": 276,
    "active": true
  },
  {
    "id": "007P",
    "word": "~どおり",
    "reading": "どおり",
    "tone": "1",
    "pos": "[后缀]",
    "meaning": "照 样，原样",
    "sourceIndex": 277,
    "active": true
  },
  {
    "id": "007Q",
    "word": "動く",
    "reading": "うごく",
    "tone": "2",
    "pos": "[自动1]",
    "meaning": "运转，转动",
    "sourceIndex": 278,
    "active": true
  },
  {
    "id": "007R",
    "word": "某",
    "reading": "ぼう",
    "tone": "1",
    "pos": "[名]",
    "meaning": "某",
    "sourceIndex": 279,
    "active": true
  },
  {
    "id": "007S",
    "word": "私鉄",
    "reading": "してつ",
    "tone": "0",
    "pos": "[名]",
    "meaning": "私铁，民营公司经营的铁路",
    "sourceIndex": 280,
    "active": true
  },
  {
    "id": "007T",
    "word": "定刻",
    "reading": "ていこく",
    "tone": "0",
    "pos": "[名]",
    "meaning": "准时，定时",
    "sourceIndex": 281,
    "active": true
  },
  {
    "id": "007U",
    "word": "ウェブサイト",
    "reading": "ウェブサイト",
    "tone": "3",
    "pos": "[名]",
    "meaning": "网站，站点",
    "sourceIndex": 282,
    "active": true
  },
  {
    "id": "007V",
    "word": "謝罪",
    "reading": "しゃざい",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "谢罪，道歉",
    "sourceIndex": 283,
    "active": true
  },
  {
    "id": "007W",
    "word": "声明",
    "reading": "せいめい",
    "tone": "0",
    "pos": "[名?他动3]",
    "meaning": "声明",
    "sourceIndex": 284,
    "active": true
  },
  {
    "id": "007X",
    "word": "交通機関",
    "reading": "こうつうきかん",
    "tone": "5, 6",
    "pos": "[名]",
    "meaning": "交通机构，交通系统",
    "sourceIndex": 285,
    "active": true
  },
  {
    "id": "007Y",
    "word": "機関",
    "reading": "きかん",
    "tone": "1",
    "pos": "[名]",
    "meaning": "机构，机关；装置",
    "sourceIndex": 286,
    "active": true
  },
  {
    "id": "007Z",
    "word": "いかに",
    "reading": "いかに",
    "tone": "2",
    "pos": "[副]",
    "meaning": "如何，怎样",
    "sourceIndex": 287,
    "active": true
  },
  {
    "id": "0080",
    "word": "重視",
    "reading": "じゅうし",
    "tone": "1, 0",
    "pos": "[名?他动3]",
    "meaning": "重视",
    "sourceIndex": 288,
    "active": true
  },
  {
    "id": "0081",
    "word": "物語る",
    "reading": "ものがたる",
    "tone": "4",
    "pos": "[他动1]",
    "meaning": "说明；讲，谈",
    "sourceIndex": 289,
    "active": true
  },
  {
    "id": "0082",
    "word": "高速鉄道",
    "reading": "こうそくてつどう",
    "tone": "5",
    "pos": "[名]",
    "meaning": "高铁",
    "sourceIndex": 290,
    "active": true
  },
  {
    "id": "0083",
    "word": "高速",
    "reading": "こうそく",
    "tone": "0",
    "pos": "[名]",
    "meaning": "高速",
    "sourceIndex": 291,
    "active": true
  },
  {
    "id": "0084",
    "word": "最も",
    "reading": "もっとも",
    "tone": "3",
    "pos": "[副]",
    "meaning": "最，顶，无与伦比的",
    "sourceIndex": 292,
    "active": true
  },
  {
    "id": "0085",
    "word": "現時点",
    "reading": "げんじてん",
    "tone": "1",
    "pos": "[名]",
    "meaning": "现在，目前",
    "sourceIndex": 293,
    "active": true
  },
  {
    "id": "0086",
    "word": "営業",
    "reading": "えいぎょう",
    "tone": "0",
    "pos": "[名?自动3]",
    "meaning": "营业，经商",
    "sourceIndex": 294,
    "active": true
  },
  {
    "id": "0087",
    "word": "距離",
    "reading": "きょり",
    "tone": "1",
    "pos": "[名]",
    "meaning": "距离",
    "sourceIndex": 295,
    "active": true
  },
  {
    "id": "0088",
    "word": "維持",
    "reading": "いじ",
    "tone": "1",
    "pos": "[名·他动3]",
    "meaning": "维持，维护",
    "sourceIndex": 296,
    "active": true
  },
  {
    "id": "0089",
    "word": "社長",
    "reading": "しゃちょう",
    "tone": "0",
    "pos": "[名]",
    "meaning": "社长、总经理",
    "sourceIndex": 297,
    "active": true
  },
  {
    "id": "008A",
    "word": "叱る",
    "reading": "しかる",
    "tone": "0",
    "pos": "[他动1]",
    "meaning": "责备，批评",
    "sourceIndex": 298,
    "active": true
  },
  {
    "id": "008B",
    "word": "落とす",
    "reading": "おとす",
    "tone": "2",
    "pos": "[他动1]",
    "meaning": "掉，丢失",
    "sourceIndex": 299,
    "active": true
  },
  {
    "id": "008C",
    "word": "年寄り",
    "reading": "としより",
    "tone": "3, 4",
    "pos": "[名]",
    "meaning": "上年纪的人，老人",
    "sourceIndex": 300,
    "active": true
  },
  {
    "id": "008D",
    "word": "寿司",
    "reading": "すし",
    "tone": "2, 1",
    "pos": "[名]",
    "meaning": "寿司",
    "sourceIndex": 301,
    "active": true
  },
  {
    "id": "008E",
    "word": "他人",
    "reading": "たにん",
    "tone": "0",
    "pos": "[名]",
    "meaning": "他人",
    "sourceIndex": 302,
    "active": true
  },
  {
    "id": "008F",
    "word": "熱心",
    "reading": "ねっしん",
    "tone": "1, 3",
    "pos": "[形2]",
    "meaning": "热心，热忱",
    "sourceIndex": 303,
    "active": true
  }
];
