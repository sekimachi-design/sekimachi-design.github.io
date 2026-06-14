// 英検5級レベルの文法レッスン データ
// 単元ごとに「説明」「ポイント」「例文」をまとめている。小学生でもわかる日本語で解説。

const STUDY_UNITS = [
  {
    id: 1,
    emoji: "📘",
    title: "be動詞 (am・is・are)",
    summary: "「〜です」「〜にいます」を表す基本の文",
    sections: [
      {
        heading: "be動詞ってなに？",
        body: "「〜です」「〜にいます」を表す言葉を「be動詞」と言うよ。主語（だれ・なに）によって am・is・are を使い分けるよ。",
        points: [
          "I（わたし）→ am",
          "You・We・They など、あなた・複数 → are",
          "He・She・It など、1人・1つ → is"
        ],
        examples: [
          { en: "I am Kotaro.", ja: "わたしはコウタロウです。" },
          { en: "You are kind.", ja: "あなたはやさしいです。" },
          { en: "She is a student.", ja: "彼女は学生です。" }
        ]
      },
      {
        heading: "否定文・疑問文の作り方",
        body: "否定文は be動詞のあとに not をつけるよ。疑問文は be動詞を文のはじめに出すよ。",
        points: [
          "否定文：主語 + be動詞 + not + ...",
          "疑問文：be動詞 + 主語 + ... ?"
        ],
        examples: [
          { en: "I am not hungry.", ja: "わたしはおなかが空いていません。" },
          { en: "Are you tired?", ja: "あなたは疲れていますか？" },
          { en: "Is he a teacher?", ja: "彼は先生ですか？" }
        ]
      }
    ]
  },
  {
    id: 2,
    emoji: "🙋",
    title: "人を表す言葉と「〜の」",
    summary: "I・you・he・she と my・your・his・her",
    sections: [
      {
        heading: "人を表す言葉（代名詞）",
        body: "人やものを指す言葉を覚えよう。文の主語になる形だよ。",
        points: [
          "I（わたし）　you（あなた）　he（彼）",
          "she（彼女）　it（それ）",
          "we（わたしたち）　they（彼ら・それら）"
        ],
        examples: [
          { en: "He is my brother.", ja: "彼はわたしの兄（弟）です。" },
          { en: "They are my friends.", ja: "彼らはわたしの友達です。" }
        ]
      },
      {
        heading: "「〜の」を表す言葉（所有格）",
        body: "「わたしの」「あなたの」のように、持ち主を表す言葉だよ。名詞の前に置いて使うよ。",
        points: [
          "my（わたしの）　your（あなたの）",
          "his（彼の）　her（彼女の）",
          "our（わたしたちの）　their（彼らの）"
        ],
        examples: [
          { en: "This is my bag.", ja: "これはわたしのバッグです。" },
          { en: "Is that your pen?", ja: "それはあなたのペンですか？" }
        ]
      }
    ]
  },
  {
    id: 3,
    emoji: "🏃",
    title: "一般動詞と3人称単数のs",
    summary: "play・like・studyなどの動詞と、sのつけ方",
    sections: [
      {
        heading: "一般動詞ってなに？",
        body: "be動詞（am・is・are）以外の「〜する」を表す言葉を「一般動詞」と言うよ。play（する）・like（好き）・study（勉強する）・go（行く）・have（持っている）などがあるよ。",
        points: [],
        examples: [
          { en: "I play soccer.", ja: "わたしはサッカーをします。" },
          { en: "We like music.", ja: "わたしたちは音楽が好きです。" }
        ]
      },
      {
        heading: "3人称単数のs",
        body: "主語が He・She・It や、1人・1つの名前のとき、動詞の終わりに s や es をつけるよ。これを「3単現のs」と言うよ。",
        points: [
          "play → plays",
          "like → likes",
          "study → studies（yをiに変えてes）",
          "go → goes、have → has（特別な形）"
        ],
        examples: [
          { en: "He plays soccer.", ja: "彼はサッカーをします。" },
          { en: "She likes music.", ja: "彼女は音楽が好きです。" },
          { en: "She studies English.", ja: "彼女は英語を勉強します。" }
        ]
      }
    ]
  },
  {
    id: 4,
    emoji: "❓",
    title: "一般動詞の否定文・疑問文",
    summary: "do not / does not と Do / Does の使い方",
    sections: [
      {
        heading: "一般動詞の否定文",
        body: "「〜しません」と言うときは、動詞の前に do not（don't）または does not（doesn't）を置くよ。主語が He・She・It のときは does not を使うよ。",
        points: [
          "I / you / we / they + don't + 動詞",
          "he / she / it + doesn't + 動詞"
        ],
        examples: [
          { en: "I do not like coffee.", ja: "わたしはコーヒーが好きではありません。" },
          { en: "He doesn't play tennis.", ja: "彼はテニスをしません。" }
        ]
      },
      {
        heading: "一般動詞の疑問文",
        body: "「〜しますか？」とたずねるときは、文のはじめに Do または Does を置くよ。Doesを使うときは動詞のsやesは取って元の形（原形）にするよ。",
        points: [
          "Do + I / you / we / they + 動詞の原形 ... ?",
          "Does + he / she / it + 動詞の原形 ... ?"
        ],
        examples: [
          { en: "Do you like dogs?", ja: "あなたは犬が好きですか？" },
          { en: "Does she play the piano?", ja: "彼女はピアノを弾きますか？" }
        ]
      }
    ]
  },
  {
    id: 5,
    emoji: "🔢",
    title: "複数形と a / an",
    summary: "ひとつのものとふたつ以上のものの言い方",
    sections: [
      {
        heading: "a / an の使い方",
        body: "ひとつ（単数）のものには a をつけるよ。a の後ろの言葉が a・i・u・e・o の音で始まるときは an を使うよ。",
        points: [
          "a cat（1匹のねこ）　a book（1冊の本）",
          "an apple（1つのりんご）　an egg（1つの卵）"
        ],
        examples: [
          { en: "I have a cat.", ja: "わたしはねこを1匹飼っています。" },
          { en: "I want an apple.", ja: "わたしはりんごが1つ欲しいです。" }
        ]
      },
      {
        heading: "複数形の作り方",
        body: "2つ以上のものは、名詞の終わりに s や es をつけるよ。-s, -x, -ch, -sh で終わる言葉には es をつけるよ。",
        points: [
          "book → books、cat → cats",
          "box → boxes、dish → dishes",
          "child → children のような特別な形もある"
        ],
        examples: [
          { en: "I have two cats.", ja: "わたしはねこを2匹飼っています。" },
          { en: "There are three boxes.", ja: "箱が3つあります。" }
        ]
      }
    ]
  },
  {
    id: 6,
    emoji: "👉",
    title: "this・that・these・those・it",
    summary: "近いもの・遠いもの・それを表す言葉",
    sections: [
      {
        heading: "近いものと遠いもの",
        body: "近くにあるものを指すときは this（これ）・these（これら）を使うよ。遠くにあるものを指すときは that（あれ）・those（あれら）を使うよ。",
        points: [
          "this（これ・単数）　these（これら・複数）",
          "that（あれ・単数）　those（あれら・複数）"
        ],
        examples: [
          { en: "This is a pen.", ja: "これはペンです。" },
          { en: "That is a car.", ja: "あれは車です。" },
          { en: "These are my books.", ja: "これらはわたしの本です。" }
        ]
      },
      {
        heading: "itの使い方",
        body: "it は「それ」という意味のほかに、時間・天気・日付・距離などを表すときにも使うよ。このときの it は日本語に訳さないことが多いよ。",
        points: [],
        examples: [
          { en: "It is sunny today.", ja: "今日は晴れです。" },
          { en: "What time is it?", ja: "今何時ですか？" }
        ]
      }
    ]
  },
  {
    id: 7,
    emoji: "📣",
    title: "命令文",
    summary: "「〜して」「〜しないで」と伝える文",
    sections: [
      {
        heading: "「〜して」と伝える文",
        body: "「〜して」と人に伝えるときは、主語（YouやI）を言わずに、動詞の元の形（原形）から文を始めるよ。",
        points: [],
        examples: [
          { en: "Open the door.", ja: "ドアを開けて。" },
          { en: "Stand up.", ja: "立ってください。" }
        ]
      },
      {
        heading: "「〜しないで」とていねいな言い方",
        body: "「〜しないで」と伝えるときは文の最初に Don't をつけるよ。文の最初か最後に Please をつけると、よりていねいな言い方になるよ。",
        points: [],
        examples: [
          { en: "Don't run here.", ja: "ここで走らないで。" },
          { en: "Please sit down.", ja: "すわってください。" },
          { en: "Help me, please.", ja: "手伝ってください。" }
        ]
      }
    ]
  },
  {
    id: 8,
    emoji: "🏃‍♀️",
    title: "現在進行形 (be + 〜ing)",
    summary: "「今〜しているところ」を表す形",
    sections: [
      {
        heading: "今していることを表す形",
        body: "「今〜しているところです」と言うときは、be動詞（am・is・are）のあとに動詞のing形を続けるよ。",
        points: [
          "play → playing",
          "read → reading",
          "run → running（最後の文字を重ねてing）"
        ],
        examples: [
          { en: "I am reading a book.", ja: "わたしは本を読んでいます。" },
          { en: "She is cooking dinner.", ja: "彼女は夕飯を作っています。" }
        ]
      },
      {
        heading: "否定文・疑問文",
        body: "否定文は be動詞のあとに not をつけるよ。疑問文は be動詞を主語の前に出すよ。",
        points: [],
        examples: [
          { en: "He is not sleeping.", ja: "彼は寝ていません。" },
          { en: "Are they playing soccer?", ja: "彼らはサッカーをしていますか？" }
        ]
      }
    ]
  },
  {
    id: 9,
    emoji: "💪",
    title: "canの使い方",
    summary: "「〜できる」「〜してもいい」を表す言葉",
    sections: [
      {
        heading: "「〜できる」を表すcan",
        body: "「〜することができる」と言うときは、can のあとに動詞の元の形（原形）を続けるよ。",
        points: [],
        examples: [
          { en: "I can swim.", ja: "わたしは泳げます。" },
          { en: "She can play the guitar.", ja: "彼女はギターを弾けます。" }
        ]
      },
      {
        heading: "否定文・疑問文・お願いするとき",
        body: "「〜できません」は cannot（can't）を使うよ。「〜できますか？」は Can を主語の前に出すよ。Can you 〜? は「〜してくれますか？」とお願いするときにも使うよ。",
        points: [],
        examples: [
          { en: "I can't run fast.", ja: "わたしは速く走れません。" },
          { en: "Can you help me?", ja: "手伝ってもらえますか？" }
        ]
      }
    ]
  },
  {
    id: 10,
    emoji: "❔",
    title: "疑問詞 (What・Who・Whereなど)",
    summary: "知りたいことをたずねる言葉",
    sections: [
      {
        heading: "知りたいことをたずねる言葉",
        body: "「何」「だれ」「どこ」など、知りたいことをたずねるときに使う言葉を「疑問詞」と言うよ。文のいちばん最初に置くよ。",
        points: [
          "what（何）　who（だれ）　where（どこ）",
          "when（いつ）　why（なぜ）",
          "how（どうやって・どのくらい）",
          "which（どちら）　whose（だれの）"
        ],
        examples: [
          { en: "What is this?", ja: "これは何ですか？" },
          { en: "Where do you live?", ja: "あなたはどこに住んでいますか？" },
          { en: "How are you?", ja: "お元気ですか？" }
        ]
      },
      {
        heading: "疑問詞のある文の作り方",
        body: "「疑問詞 ＋ 疑問文の形（be動詞 / do・does / can など）」の順番で文を作るよ。",
        points: [],
        examples: [
          { en: "Who is that boy?", ja: "あの男の子はだれですか？" },
          { en: "When is your birthday?", ja: "あなたの誕生日はいつですか？" }
        ]
      }
    ]
  },
  {
    id: 11,
    emoji: "📍",
    title: "前置詞 (in・on・atなど)",
    summary: "場所や時間を表す言葉",
    sections: [
      {
        heading: "場所を表す前置詞",
        body: "ものがどこにあるかを表す言葉を「前置詞」と言うよ。名詞の前に置いて使うよ。",
        points: [
          "in（〜の中に）　on（〜の上に）",
          "under（〜の下に）　by / near（〜のそばに）",
          "in front of（〜の前に）　behind（〜の後ろに）"
        ],
        examples: [
          { en: "The cat is under the table.", ja: "ねこはテーブルの下にいます。" },
          { en: "The book is on the desk.", ja: "本は机の上にあります。" }
        ]
      },
      {
        heading: "時間を表す前置詞",
        body: "時刻には at、曜日や日付には on、月・季節・年には in を使うよ。",
        points: [
          "at + 時刻（at seven）",
          "on + 曜日・日付（on Friday）",
          "in + 月・季節・年（in May）"
        ],
        examples: [
          { en: "I get up at seven.", ja: "わたしは7時に起きます。" },
          { en: "We have a test on Friday.", ja: "金曜日にテストがあります。" },
          { en: "My birthday is in May.", ja: "わたしの誕生日は5月です。" }
        ]
      }
    ]
  },
  {
    id: 12,
    emoji: "🕒",
    title: "数・曜日・月・時刻の表現",
    summary: "数字、曜日、月、時間の言い方",
    sections: [
      {
        heading: "数の言い方",
        body: "1から20までの数はそれぞれ特別な形があるよ。21以上は twenty-one のように、十の位と一の位をハイフンでつなげるよ。",
        points: [
          "1 one　2 two　3 three　…　10 ten",
          "11 eleven　12 twelve　13 thirteen　…",
          "20 twenty　21 twenty-one"
        ],
        examples: [
          { en: "I have three pens.", ja: "わたしはペンを3本持っています。" }
        ]
      },
      {
        heading: "曜日・月・時刻",
        body: "曜日は Sunday から Saturday まで、月は January から December まであるよ。時刻は「It's 〜 o'clock.」で表すよ。",
        points: [
          "曜日：Sunday・Monday・Tuesday・Wednesday・Thursday・Friday・Saturday",
          "月：January・February・March・April・May・June・July・August・September・October・November・December"
        ],
        examples: [
          { en: "Today is Monday.", ja: "今日は月曜日です。" },
          { en: "It's three o'clock.", ja: "3時です。" }
        ]
      }
    ]
  }
];
