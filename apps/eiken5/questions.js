// 英検5級レベルの問題データ
// 各ステージ8問（タイピングの島のみ単語practice用に問題多数）。全問正解でステージのモンスターを撃破できる！

const STAGES = [
  {
    id: 9,
    name: "タイピングの島",
    monsterName: "タイパー",
    monsterEmoji: "⌨️",
    bgColor: "#caffbf",
    type: "typing",
    questions: [
      { q: "りんご", answer: "apple", tip: "\"apple\" ＝りんご。a-p-p-l-e の5文字。スペルを声に出しながら書くと覚えやすいよ。" },
      { q: "ねこ", answer: "cat", tip: "\"cat\" ＝ねこ。c-a-t の3文字。短い単語から自信をつけよう！" },
      { q: "本", answer: "book", tip: "\"book\" ＝本。b-o-o-k の4文字。oが2つ続くところに注意してね。" },
      { q: "青", answer: "blue", tip: "\"blue\" ＝青。b-l-u-e の4文字。色の名前は英検でもよく出るよ。" },
      { q: "水", answer: "water", tip: "\"water\" ＝水。w-a-t-e-r の5文字。最初のwの音に注意して発音しよう。" },
      { q: "学校", answer: "school", tip: "\"school\" ＝学校。s-c-h-o-o-l の6文字。「sch」のつづりが少し難しいので、ゆっくり書いてみよう。" },
      { q: "友達", answer: "friend", tip: "\"friend\" ＝友達。f-r-i-e-n-d の6文字。「frien」の部分のつづりに気をつけて。" },
      { q: "家族", answer: "family", tip: "\"family\" ＝家族。f-a-m-i-l-y の6文字。よく使う単語なので、まとまりで覚えておこう。" },

      // ◆ 動物
      { q: "犬", answer: "dog", tip: "\"dog\" ＝犬。d-o-g の3文字。" },
      { q: "鳥", answer: "bird", tip: "\"bird\" ＝鳥。b-i-r-d の4文字。" },
      { q: "魚", answer: "fish", tip: "\"fish\" ＝魚。f-i-s-h の4文字。単数でも複数でもfishのままだよ。" },
      { q: "うさぎ", answer: "rabbit", tip: "\"rabbit\" ＝うさぎ。r-a-b-b-i-t の6文字。bが2つ続くよ。" },
      { q: "馬", answer: "horse", tip: "\"horse\" ＝馬。h-o-r-s-e の5文字。" },
      { q: "ぶた", answer: "pig", tip: "\"pig\" ＝ぶた。p-i-g の3文字。" },
      { q: "牛", answer: "cow", tip: "\"cow\" ＝牛。c-o-w の3文字。" },
      { q: "ライオン", answer: "lion", tip: "\"lion\" ＝ライオン。l-i-o-n の4文字。" },
      { q: "さる", answer: "monkey", tip: "\"monkey\" ＝さる。m-o-n-k-e-y の6文字。" },
      { q: "くま", answer: "bear", tip: "\"bear\" ＝くま。b-e-a-r の4文字。" },

      // ◆ 食べ物・飲み物
      { q: "パン", answer: "bread", tip: "\"bread\" ＝パン。b-r-e-a-d の5文字。" },
      { q: "ごはん（米）", answer: "rice", tip: "\"rice\" ＝ごはん（米）。r-i-c-e の4文字。" },
      { q: "牛乳", answer: "milk", tip: "\"milk\" ＝牛乳。m-i-l-k の4文字。" },
      { q: "卵", answer: "egg", tip: "\"egg\" ＝卵。e-g-g の3文字。gが2つ続くよ。" },
      { q: "肉", answer: "meat", tip: "\"meat\" ＝肉。m-e-a-t の4文字。" },
      { q: "ケーキ", answer: "cake", tip: "\"cake\" ＝ケーキ。c-a-k-e の4文字。" },
      { q: "ジュース", answer: "juice", tip: "\"juice\" ＝ジュース。j-u-i-c-e の5文字。" },
      { q: "お茶", answer: "tea", tip: "\"tea\" ＝お茶。t-e-a の3文字。" },
      { q: "バナナ", answer: "banana", tip: "\"banana\" ＝バナナ。b-a-n-a-n-a の6文字。aが3つ入っているよ。" },
      { q: "オレンジ", answer: "orange", tip: "\"orange\" ＝オレンジ。o-r-a-n-g-e の6文字。色の名前としても使うよ。" },
      { q: "トマト", answer: "tomato", tip: "\"tomato\" ＝トマト。t-o-m-a-t-o の6文字。" },
      { q: "じゃがいも", answer: "potato", tip: "\"potato\" ＝じゃがいも。p-o-t-a-t-o の6文字。tomatoと似ているので注意。" },

      // ◆ 家族
      { q: "お母さん", answer: "mother", tip: "\"mother\" ＝お母さん。m-o-t-h-e-r の6文字。" },
      { q: "お父さん", answer: "father", tip: "\"father\" ＝お父さん。f-a-t-h-e-r の6文字。" },
      { q: "兄・弟", answer: "brother", tip: "\"brother\" ＝兄・弟。b-r-o-t-h-e-r の7文字。" },
      { q: "姉・妹", answer: "sister", tip: "\"sister\" ＝姉・妹。s-i-s-t-e-r の6文字。" },
      { q: "おばあさん", answer: "grandmother", tip: "\"grandmother\" ＝おばあさん。g-r-a-n-d-m-o-t-h-e-r の11文字。grand+motherでできているよ。" },
      { q: "おじいさん", answer: "grandfather", tip: "\"grandfather\" ＝おじいさん。g-r-a-n-d-f-a-t-h-e-r の11文字。grand+fatherでできているよ。" },
      { q: "赤ちゃん", answer: "baby", tip: "\"baby\" ＝赤ちゃん。b-a-b-y の4文字。" },
      { q: "両親", answer: "parents", tip: "\"parents\" ＝両親。p-a-r-e-n-t-s の7文字。いつもsがついた形で使うよ。" },

      // ◆ 色
      { q: "赤", answer: "red", tip: "\"red\" ＝赤。r-e-d の3文字。" },
      { q: "白", answer: "white", tip: "\"white\" ＝白。w-h-i-t-e の5文字。" },
      { q: "黒", answer: "black", tip: "\"black\" ＝黒。b-l-a-c-k の5文字。" },
      { q: "緑", answer: "green", tip: "\"green\" ＝緑。g-r-e-e-n の5文字。eが2つ続くよ。" },
      { q: "黄色", answer: "yellow", tip: "\"yellow\" ＝黄色。y-e-l-l-o-w の6文字。lが2つ続くよ。" },
      { q: "ピンク", answer: "pink", tip: "\"pink\" ＝ピンク。p-i-n-k の4文字。" },

      // ◆ 学校で使うもの
      { q: "えんぴつ", answer: "pencil", tip: "\"pencil\" ＝えんぴつ。p-e-n-c-i-l の6文字。" },
      { q: "ペン", answer: "pen", tip: "\"pen\" ＝ペン。p-e-n の3文字。" },
      { q: "消しゴム", answer: "eraser", tip: "\"eraser\" ＝消しゴム。e-r-a-s-e-r の6文字。" },
      { q: "ノート", answer: "notebook", tip: "\"notebook\" ＝ノート。n-o-t-e-b-o-o-k の8文字。note＋bookでできているよ。" },
      { q: "机", answer: "desk", tip: "\"desk\" ＝机。d-e-s-k の4文字。" },
      { q: "いす", answer: "chair", tip: "\"chair\" ＝いす。c-h-a-i-r の5文字。" },
      { q: "バッグ", answer: "bag", tip: "\"bag\" ＝バッグ。b-a-g の3文字。" },
      { q: "ものさし", answer: "ruler", tip: "\"ruler\" ＝ものさし。r-u-l-e-r の5文字。" },

      // ◆ スポーツ
      { q: "野球", answer: "baseball", tip: "\"baseball\" ＝野球。b-a-s-e-b-a-l-l の8文字。base＋ballでできているよ。" },
      { q: "テニス", answer: "tennis", tip: "\"tennis\" ＝テニス。t-e-n-n-i-s の6文字。nが2つ続くよ。" },
      { q: "バスケットボール", answer: "basketball", tip: "\"basketball\" ＝バスケットボール。b-a-s-k-e-t-b-a-l-l の10文字。basket＋ballでできているよ。" },
      { q: "水泳", answer: "swimming", tip: "\"swimming\" ＝水泳。s-w-i-m-m-i-n-g の8文字。mが2つ続くよ。" },
      { q: "バレーボール", answer: "volleyball", tip: "\"volleyball\" ＝バレーボール。v-o-l-l-e-y-b-a-l-l の10文字。lが2つ続くところに注意。" },

      // ◆ 体の部分
      { q: "頭", answer: "head", tip: "\"head\" ＝頭。h-e-a-d の4文字。" },
      { q: "手", answer: "hand", tip: "\"hand\" ＝手。h-a-n-d の4文字。" },
      { q: "足", answer: "foot", tip: "\"foot\" ＝足。f-o-o-t の4文字。oが2つ続くよ。複数形はfeetになるよ。" },
      { q: "目", answer: "eye", tip: "\"eye\" ＝目。e-y-e の3文字。" },
      { q: "耳", answer: "ear", tip: "\"ear\" ＝耳。e-a-r の3文字。" },
      { q: "口", answer: "mouth", tip: "\"mouth\" ＝口。m-o-u-t-h の5文字。" },

      // ◆ 天気
      { q: "晴れ", answer: "sunny", tip: "\"sunny\" ＝晴れ。s-u-n-n-y の5文字。nが2つ続くよ。" },
      { q: "雨", answer: "rainy", tip: "\"rainy\" ＝雨。r-a-i-n-y の5文字。rain＋yでできているよ。" },
      { q: "くもり", answer: "cloudy", tip: "\"cloudy\" ＝くもり。c-l-o-u-d-y の6文字。cloud＋yでできているよ。" },
      { q: "雪", answer: "snowy", tip: "\"snowy\" ＝雪。s-n-o-w-y の5文字。snow＋yでできているよ。" },
      { q: "風が強い", answer: "windy", tip: "\"windy\" ＝風が強い。w-i-n-d-y の5文字。wind＋yでできているよ。" },

      // ◆ 場所
      { q: "公園", answer: "park", tip: "\"park\" ＝公園。p-a-r-k の4文字。" },
      { q: "駅", answer: "station", tip: "\"station\" ＝駅。s-t-a-t-i-o-n の7文字。" },
      { q: "病院", answer: "hospital", tip: "\"hospital\" ＝病院。h-o-s-p-i-t-a-l の8文字。" },
      { q: "レストラン", answer: "restaurant", tip: "\"restaurant\" ＝レストラン。r-e-s-t-a-u-r-a-n-t の10文字。少し長いけど食事に行く場所だよ。" },
      { q: "動物園", answer: "zoo", tip: "\"zoo\" ＝動物園。z-o-o の3文字。oが2つ続くよ。" },
      { q: "博物館", answer: "museum", tip: "\"museum\" ＝博物館。m-u-s-e-u-m の6文字。" },
      { q: "空港", answer: "airport", tip: "\"airport\" ＝空港。a-i-r-p-o-r-t の7文字。air＋portでできているよ。" },

      // ◆ 動詞
      { q: "する・遊ぶ", answer: "play", tip: "\"play\" ＝する・遊ぶ。p-l-a-y の4文字。スポーツや楽器の前につけるよ。" },
      { q: "勉強する", answer: "study", tip: "\"study\" ＝勉強する。s-t-u-d-y の5文字。" },
      { q: "読む", answer: "read", tip: "\"read\" ＝読む。r-e-a-d の4文字。" },
      { q: "書く", answer: "write", tip: "\"write\" ＝書く。w-r-i-t-e の5文字。最初のwは発音しないよ。" },
      { q: "食べる", answer: "eat", tip: "\"eat\" ＝食べる。e-a-t の3文字。" },
      { q: "飲む", answer: "drink", tip: "\"drink\" ＝飲む。d-r-i-n-k の5文字。" },
      { q: "寝る", answer: "sleep", tip: "\"sleep\" ＝寝る。s-l-e-e-p の5文字。eが2つ続くよ。" },
      { q: "走る", answer: "run", tip: "\"run\" ＝走る。r-u-n の3文字。" },
      { q: "泳ぐ", answer: "swim", tip: "\"swim\" ＝泳ぐ。s-w-i-m の4文字。" },
      { q: "歌う", answer: "sing", tip: "\"sing\" ＝歌う。s-i-n-g の4文字。" },

      // ◆ 形容詞
      { q: "大きい", answer: "big", tip: "\"big\" ＝大きい。b-i-g の3文字。" },
      { q: "小さい", answer: "small", tip: "\"small\" ＝小さい。s-m-a-l-l の5文字。lが2つ続くよ。" },
      { q: "長い", answer: "long", tip: "\"long\" ＝長い。l-o-n-g の4文字。" },
      { q: "短い", answer: "short", tip: "\"short\" ＝短い。s-h-o-r-t の5文字。" },
      { q: "新しい", answer: "new", tip: "\"new\" ＝新しい。n-e-w の3文字。" },
      { q: "古い・年をとった", answer: "old", tip: "\"old\" ＝古い・年をとった。o-l-d の3文字。" },
      { q: "うれしい", answer: "happy", tip: "\"happy\" ＝うれしい。h-a-p-p-y の5文字。pが2つ続くよ。" },
      { q: "悲しい", answer: "sad", tip: "\"sad\" ＝悲しい。s-a-d の3文字。" },
      { q: "良い", answer: "good", tip: "\"good\" ＝良い。g-o-o-d の4文字。oが2つ続くよ。" },
      { q: "速い", answer: "fast", tip: "\"fast\" ＝速い。f-a-s-t の4文字。" },

      // ◆ 家のもの
      { q: "家", answer: "house", tip: "\"house\" ＝家。h-o-u-s-e の5文字。" },
      { q: "部屋", answer: "room", tip: "\"room\" ＝部屋。r-o-o-m の4文字。oが2つ続くよ。" },
      { q: "ドア", answer: "door", tip: "\"door\" ＝ドア。d-o-o-r の4文字。oが2つ続くよ。" },
      { q: "窓", answer: "window", tip: "\"window\" ＝窓。w-i-n-d-o-w の6文字。" },
      { q: "ベッド", answer: "bed", tip: "\"bed\" ＝ベッド。b-e-d の3文字。" }
    ]
  },
  {
    id: 1,
    name: "あいさつの島",
    monsterName: "モジャ",
    monsterEmoji: "🐣",
    bgColor: "#8ed6ff",
    questions: [
      { q: "「おはよう」を表す英語は？", choices: ["Good night", "Good morning", "Good afternoon", "Good evening"], answer: 1, tip: "「Good morning」＝おはよう。朝のあいさつだよ。「こんにちは」はGood afternoon、「こんばんは」はGood evening、「おやすみ」はGood nightだよ。時間によって使い分けよう！" },
      { q: "\"Nice to meet you.\" の意味は？", choices: ["また会いましょう", "はじめまして", "ありがとう", "ごめんなさい"], answer: 1, tip: "「Nice to meet you.」＝はじめまして。初めて会った人へのあいさつ表現。言われたら同じように「Nice to meet you, too.（こちらこそ、はじめまして）」と返すといいよ。" },
      { q: "\"My ___ is Kotaro.\" にあてはまるのは？", choices: ["name", "school", "friend", "house"], answer: 0, tip: "「My name is ~.」＝私の名前は~です。nameは「名前」という意味だよ。自己紹介の基本フレーズなので覚えておこう。" },
      { q: "\"How are you?\" への返事として正しいのは？", choices: ["I'm fine, thank you.", "I'm Japan.", "Nice bag!", "See you."], answer: 0, tip: "「How are you?」＝元気ですか？には「I'm fine, thank you.（元気です、ありがとう）」のように答えるのが定番。他に「I'm good.」「Not bad.」なども使われるよ。" },
      { q: "「さようなら」の英語は？", choices: ["Hello", "Sorry", "Goodbye", "Please"], answer: 2, tip: "「Goodbye」＝さようなら。もっと気軽に「See you!（またね）」「Bye!（バイバイ）」と言うこともできるよ。" },
      { q: "\"Where are you from?\" の意味は？", choices: ["あなたは何歳ですか", "あなたはどこの出身ですか", "あなたの名前は何ですか", "あなたは元気ですか"], answer: 1, tip: "「Where are you from?」＝あなたはどこの出身ですか。fromは「～から」という意味で、出身地を聞くときに使う表現だよ。" },
      { q: "\"I'm from Japan.\" の意味は？", choices: ["私は学生です", "私は日本出身です", "私は日本に行きます", "私は日本が好きです"], answer: 1, tip: "「I'm from ~.」＝私は~出身です。「I'm from Japan.」で「私は日本出身です」という意味になるよ。" },
      { q: "「ありがとう」を表す英語は？", choices: ["Thank you", "Excuse me", "You're welcome", "Sorry"], answer: 0, tip: "「Thank you」＝ありがとう。お礼を言われたときは「You're welcome.（どういたしまして）」と返事をするとていねいだよ。" }
    ]
  },
  {
    id: 2,
    name: "数・時間の島",
    monsterName: "トケッチ",
    monsterEmoji: "⏰",
    bgColor: "#a0e6a0",
    questions: [
      { q: "「11」の英語は？", choices: ["eleven", "twelve", "seven", "nine"], answer: 0, tip: "「eleven」＝11。11(eleven)と12(twelve)は特別な形なので、まとめてしっかり覚えよう。13以降はthirteen, fourteen…と「-teen」がつくよ。" },
      { q: "「20」の英語は？", choices: ["tenty", "twenty", "twelfth", "two-ten"], answer: 1, tip: "「twenty」＝20。20, 30, 40…は twenty, thirty, forty のように「-ty」で終わるよ。「tenty」という単語は無いので注意！" },
      { q: "「火曜日」は？", choices: ["Monday", "Tuesday", "Thursday", "Sunday"], answer: 1, tip: "「Tuesday」＝火曜日。曜日は月曜日から Monday→Tuesday→Wednesday→Thursday→Friday→Saturday→Sunday の順番で覚えよう。" },
      { q: "「8月」の英語は？", choices: ["April", "August", "October", "June"], answer: 1, tip: "「August」＝8月。月の名前は全部大文字で始まるよ。1月January、2月February…と順番に音読して覚えると効果的！" },
      { q: "\"What time is it?\" の意味は？", choices: ["今日は何曜日ですか", "今何時ですか", "今日は何月ですか", "あなたは何歳ですか"], answer: 1, tip: "「What time is it?」＝今何時ですか。timeは「時間」という意味。答えるときは「It's ~ o'clock.」のように言うよ。" },
      { q: "\"It's three o'clock.\" の意味は？", choices: ["3時です", "3月です", "3歳です", "3番目です"], answer: 0, tip: "「~ o'clock」＝~時。「It's three o'clock.」で「3時です」という意味。ちょうどの時間を言うときに使うよ。" },
      { q: "「金曜日」は？", choices: ["Friday", "Wednesday", "Saturday", "Sunday"], answer: 0, tip: "「Friday」＝金曜日。土曜日Saturday・日曜日Sundayと合わせて、週末の曜日もしっかり覚えよう。" },
      { q: "「100」の英語は？", choices: ["hundred", "thousand", "million", "tenty"], answer: 0, tip: "「hundred」＝100。1000はthousand、100万はmillionだよ。数が大きくなるごとに新しい単語になるので一緒に覚えておこう。" }
    ]
  },
  {
    id: 3,
    name: "くらしの単語の島",
    monsterName: "パレッタ",
    monsterEmoji: "🎨",
    bgColor: "#ffd6a0",
    questions: [
      { q: "「赤」の英語は？", choices: ["blue", "red", "green", "yellow"], answer: 1, tip: "「red」＝赤。色の名前はよく出題されるよ。blue(青)・green(緑)・yellow(黄色)もあわせて覚えておこう。" },
      { q: "「犬」の英語は？", choices: ["cat", "dog", "bird", "fish"], answer: 1, tip: "「dog」＝犬。動物の名前の基本単語だよ。cat(ねこ)・bird(鳥)・fish(魚)もよく出るので一緒にチェック！" },
      { q: "「りんご」の英語は？", choices: ["orange", "apple", "banana", "grape"], answer: 1, tip: "「apple」＝りんご。果物の名前もよく出るよ。orange(オレンジ)・banana(バナナ)・grape(ぶどう)も覚えておこう。" },
      { q: "「教科書」の英語は？", choices: ["notebook", "textbook", "pencil", "eraser"], answer: 1, tip: "「textbook」＝教科書。学校で使う持ち物の単語だよ。notebook(ノート)・pencil(えんぴつ)・eraser(消しゴム)もあわせて覚えよう。" },
      { q: "\"I have a pen.\" の意味は？", choices: ["私はペンを持っています", "私はペンを買います", "これは私のペンです", "あれはペンです"], answer: 0, tip: "「I have ~.」＝私は~を持っています。haveは「持っている」という意味の動詞だよ。" },
      { q: "「図書館」の英語は？", choices: ["library", "hospital", "station", "park"], answer: 0, tip: "「library」＝図書館。建物の名前もよく出るよ。hospital(病院)・station(駅)・park(公園)もセットで覚えておこう。" },
      { q: "「サッカー」の英語は？", choices: ["baseball", "tennis", "soccer", "basketball"], answer: 2, tip: "「soccer」＝サッカー。スポーツの名前も出題されやすいよ。baseball(野球)・tennis(テニス)・basketball(バスケットボール)も覚えておこう。" },
      { q: "\"These are my books.\" の意味は？", choices: ["これは私の本です", "これらは私の本です", "あれらは私の本です", "それは彼の本です"], answer: 1, tip: "「These are ~.」＝これらは~です。複数のものを指すときに使うよ。1つだけのときは「This is ~.」になるので、areとisの違いに注目！" }
    ]
  },
  {
    id: 4,
    name: "be動詞の島",
    monsterName: "ビーモン",
    monsterEmoji: "👾",
    bgColor: "#c0a0ff",
    questions: [
      { q: "\"I ___ a student.\" にあてはまるのは？", choices: ["am", "is", "are", "be"], answer: 0, tip: "be動詞は主語によって形が変わるよ。「I」のあとは必ず「am」。「I am a student.」で「私は学生です」という意味になるよ。" },
      { q: "\"She ___ my sister.\" にあてはまるのは？", choices: ["am", "is", "are", "be"], answer: 1, tip: "「She / He / It」など一人の人やものが主語のときは「is」を使うよ。「She is my sister.」＝彼女は私の姉（妹）です。" },
      { q: "\"They ___ teachers.\" にあてはまるのは？", choices: ["am", "is", "are", "be"], answer: 2, tip: "「They / We / You」など複数の人やものが主語のときは「are」を使うよ。「They are teachers.」＝彼らは先生です。" },
      { q: "\"This ___ my bag.\" にあてはまるのは？", choices: ["am", "is", "are", "be"], answer: 1, tip: "「This」は「これ」という1つのものを指すので、be動詞は「is」になるよ。「This is my bag.」＝これは私のバッグです。" },
      { q: "\"___ you a soccer fan?\" にあてはまるのは？", choices: ["Am", "Is", "Are", "Be"], answer: 2, tip: "「You」が主語の文を「～ですか？」とたずねるときは、文の最初に「Are」を置くよ。「Are you a soccer fan?」＝あなたはサッカーファンですか？" },
      { q: "\"He is not busy.\" の短縮形は？", choices: ["He's not busy.", "He not busy.", "He don't busy.", "He doesn't busy."], answer: 0, tip: "「He is」は短くすると「He's」になるよ。「He's not busy.」＝彼は忙しくありません。be動詞の短縮形（I'm, you're, she'sなど）も覚えておこう。" },
      { q: "\"We ___ in the same class.\" にあてはまるのは？", choices: ["am", "is", "are", "be"], answer: 2, tip: "「We」が主語のときは「are」を使うよ。「We are in the same class.」＝私たちは同じクラスです。" },
      { q: "\"Is this your pencil?\" への正しい答え方は？", choices: ["Yes, it is.", "Yes, I am.", "Yes, it do.", "Yes, you are."], answer: 0, tip: "「Is this ~?」と聞かれたら「Yes, it is.（はい、そうです）」または「No, it isn't.（いいえ、違います）」のように、itとisを使って答えるよ。" }
    ]
  },
  {
    id: 5,
    name: "動詞の島",
    monsterName: "ドゥーズ",
    monsterEmoji: "🐲",
    bgColor: "#ffb0c0",
    questions: [
      { q: "\"I ___ TV every day.\" にあてはまるのは？", choices: ["watch", "watches", "watching", "watched"], answer: 0, tip: "主語が「I」のときは、動詞はそのままの形（原形）を使うよ。「I watch TV every day.」＝私は毎日テレビを見ます。" },
      { q: "\"She ___ to school by bike.\" にあてはまるのは？", choices: ["go", "goes", "going", "gone"], answer: 1, tip: "主語が「She / He / It」など（三人称単数）のときは、動詞の最後に「s」をつけるよ。「go」→「goes」。「She goes to school by bike.」＝彼女は自転車で学校に行きます。" },
      { q: "\"Do you like music?\" への正しい答え方は？", choices: ["Yes, I do.", "Yes, I am.", "Yes, I like.", "Yes, you do."], answer: 0, tip: "「Do you ~?」と聞かれたら「Yes, I do.（はい、好きです）」または「No, I don't.（いいえ、好きではありません）」と答えるよ。doを使って答えるのがポイント！" },
      { q: "\"He ___ not play tennis.\" にあてはまるのは？", choices: ["do", "does", "is", "are"], answer: 1, tip: "「He / She / It」など三人称単数の否定文は「does not（短縮形：doesn't）」を使うよ。「He does not play tennis.」＝彼はテニスをしません。" },
      { q: "\"My mother ___ dinner every evening.\" にあてはまるのは？", choices: ["cook", "cooks", "cooking", "cooked"], answer: 1, tip: "「My mother」は三人称単数なので、動詞に「s」をつけて「cooks」にするよ。「My mother cooks dinner every evening.」＝私の母は毎晩夕食を作ります。" },
      { q: "\"___ your father drive a car?\" にあてはまるのは？", choices: ["Do", "Does", "Is", "Are"], answer: 1, tip: "三人称単数（your father）の疑問文は、文の最初に「Does」を置くよ。「Does your father drive a car?」＝あなたのお父さんは車を運転しますか？" },
      { q: "\"I don't ___ rice for breakfast.\" にあてはまるのは？", choices: ["eat", "eats", "eating", "ate"], answer: 0, tip: "「don't（do not）」のあとには動詞の原形（そのままの形）が続くよ。「I don't eat rice for breakfast.」＝私は朝ごはんにお米を食べません。" },
      { q: "\"What time ___ you get up?\" にあてはまるのは？", choices: ["do", "does", "are", "is"], answer: 0, tip: "「you」が主語の疑問文では「do」を使うよ。「What time do you get up?」＝あなたは何時に起きますか？" }
    ]
  },
  {
    id: 6,
    name: "canの島",
    monsterName: "キャネット",
    monsterEmoji: "🦄",
    bgColor: "#a0fff0",
    questions: [
      { q: "\"I ___ swim well.\" にあてはまるのは？", choices: ["can", "cans", "canned", "to can"], answer: 0, tip: "「can」は「～できる」という意味で、主語が何でも形が変わらないよ。後ろには動詞の原形が続くから「I can swim well.」＝私は上手に泳げます、となるよ。" },
      { q: "\"Can you help me?\" の意味は？", choices: ["手伝ってくれますか", "手伝いましたか", "手伝いますか、いいえ", "手伝ってもいいですか"], answer: 0, tip: "「Can you ~?」＝～してくれますか？　誰かにお願いをするときによく使う表現だよ。" },
      { q: "\"Can I use this pen?\" の意味は？", choices: ["このペンを使ってくれますか", "このペンを使ってもいいですか", "このペンを使いましょう", "彼はこのペンを使えますか"], answer: 1, tip: "「Can I ~?」＝～してもいいですか？　自分が何かをする許可をもらいたいときに使う表現だよ。" },
      { q: "\"She can ___ the piano.\" にあてはまるのは？", choices: ["play", "plays", "playing", "played"], answer: 0, tip: "「can」の後ろは主語が誰であっても動詞の原形になるよ。「She can play the piano.」＝彼女はピアノを弾けます。" },
      { q: "\"___ you speak English?\" -「はい、話せます」と答えるなら？", choices: ["Do", "Are", "Can", "Is"], answer: 2, tip: "「～できますか？」と聞くときは「Can ~?」を使うよ。「Can you speak English?」＝あなたは英語を話せますか？　答えるときも「Yes, I can.」「No, I can't.」のようにcanを使うよ。" },
      { q: "\"I can't ___ this question.\" にあてはまるのは？", choices: ["answer", "answers", "answering", "to answers"], answer: 0, tip: "「can't（can not）」のあとも動詞の原形が続くよ。「I can't answer this question.」＝私はこの問題に答えられません。" },
      { q: "\"Can you pass me the salt, please?\" への返事で適切なのは？", choices: ["Sure, here you are.", "Yes, I can speak.", "No, I don't.", "I'm fine."], answer: 0, tip: "「Can you pass me ~, please?」＝～を取ってくれますか？　頼みごとへの返事は「Sure, here you are.（はい、どうぞ）」のように言うのが自然だよ。" },
      { q: "\"Let's ___ soccer after school.\" にあてはまるのは？", choices: ["play", "plays", "playing", "to play"], answer: 0, tip: "「Let's ~.」＝～しましょう。のあとは動詞の原形を使うよ。「Let's play soccer after school.」＝放課後サッカーをしましょう。" }
    ]
  },
  {
    id: 7,
    name: "ぎもん文の島",
    monsterName: "クエスチョー",
    monsterEmoji: "❓",
    bgColor: "#ffe082",
    questions: [
      { q: "\"___ is your birthday?\" にあてはまるのは？", choices: ["What", "When", "Where", "Who"], answer: 1, tip: "「When」＝いつ。時を聞くときに使う疑問詞だよ。「When is your birthday?」＝あなたの誕生日はいつですか？" },
      { q: "\"___ is that girl?\" -\"She is my sister.\"", choices: ["What", "Who", "When", "How"], answer: 1, tip: "「Who」＝だれ。人をたずねるときに使う疑問詞だよ。「Who is that girl?」＝あの女の子は誰ですか？" },
      { q: "\"___ do you live?\" -\"I live in Tokyo.\"", choices: ["Where", "What", "Who", "Why"], answer: 0, tip: "「Where」＝どこ。場所をたずねるときに使う疑問詞だよ。「Where do you live?」＝あなたはどこに住んでいますか？" },
      { q: "\"___ many pencils do you have?\"", choices: ["How", "What", "Which", "Who"], answer: 0, tip: "「How many ~?」＝いくつの～？　数をたずねるときに使う表現だよ。「How many pencils do you have?」＝あなたは何本の鉛筆を持っていますか？" },
      { q: "\"___ is this bag?\" -\"It's 2,000 yen.\"", choices: ["How much", "How many", "How old", "How long"], answer: 0, tip: "「How much ~?」＝いくら？　値段をたずねるときに使う表現だよ。「How much is this bag?」＝このバッグはいくらですか？" },
      { q: "\"___ are you, Kenta?\" -\"I'm 12.\"", choices: ["How old", "How many", "How much", "What time"], answer: 0, tip: "「How old ~?」＝何歳？　年齢をたずねるときに使う表現だよ。「How old are you?」＝あなたは何歳ですか？" },
      { q: "\"___ do you go to school?\" -\"By bus.\"", choices: ["How", "What", "Where", "Why"], answer: 0, tip: "「How」＝どうやって（手段・方法）。「By bus.」のように交通手段で答えるときは「How」を使ってたずねるよ。" },
      { q: "\"___ color do you like?\"", choices: ["What", "Who", "When", "Where"], answer: 0, tip: "「What color ~?」＝何色？　好きな色などをたずねるときに使う表現だよ。「What color do you like?」＝あなたは何色が好きですか？" }
    ]
  },
  {
    id: 8,
    name: "ラストダンジョン",
    monsterName: "グランダー",
    monsterEmoji: "🐉",
    bgColor: "#ff8a80",
    questions: [
      { q: "\"Excuse me.\" の意味は？", choices: ["すみません", "おめでとう", "おやすみ", "お元気で"], answer: 0, tip: "「Excuse me.」＝すみません。人に話しかけるときや、道を聞くときなどに使う便利な表現だよ。" },
      { q: "\"There ___ many books on the desk.\" にあてはまるのは？", choices: ["is", "are", "am", "be"], answer: 1, tip: "「There is/are ~.」＝～があります。あとに続く名詞が複数（many books）のときは「are」を使うよ。1つのときは「There is ~.」になるよ。" },
      { q: "\"My birthday is ___ May 5th.\" にあてはまるのは？", choices: ["in", "on", "at", "to"], answer: 1, tip: "日付（5月5日のような特定の日）の前には「on」を使うよ。「My birthday is on May 5th.」＝私の誕生日は5月5日です。月だけのときは「in May」のように「in」を使うよ。" },
      { q: "\"I usually get up ___ seven.\" にあてはまるのは？", choices: ["in", "on", "at", "to"], answer: 2, tip: "時刻（7時のような時間）の前には「at」を使うよ。「I usually get up at seven.」＝私はいつも7時に起きます。" },
      { q: "\"Whose pen is this?\" の意味は？", choices: ["これは誰のペンですか", "これは何のペンですか", "これはどこのペンですか", "これはいつのペンですか"], answer: 0, tip: "「Whose」＝誰の。持ち主をたずねるときに使う疑問詞だよ。「Whose pen is this?」＝これは誰のペンですか？" },
      { q: "\"I want to ___ a doctor.\" にあてはまるのは？", choices: ["be", "am", "is", "are"], answer: 0, tip: "「want to ~」＝～したい。のあとは動詞の原形が続くよ。be動詞の原形は「be」。「I want to be a doctor.」＝私は医者になりたいです。" },
      { q: "\"Look at ___ picture.\" -（1枚の写真を指して）", choices: ["this", "these", "those", "they"], answer: 0, tip: "1つのものを指すときは「this（これ）」を使うよ。複数のものなら「these（これら）」になるよ。「Look at this picture.」＝この写真を見て。" },
      { q: "\"Let's go to the zoo ___ Sunday.\" にあてはまるのは？", choices: ["in", "on", "at", "for"], answer: 1, tip: "曜日（Sundayなど）の前には「on」を使うよ。「Let's go to the zoo on Sunday.」＝日曜日に動物園に行きましょう。" }
    ]
  }
];
