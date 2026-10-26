
(function () {
  var KEY = "arduna-habits-v1";
  var HABITS = [
    "أستخدم زجاجة مياه قابلة لإعادة التعبئة",
    "أحمل كيس قماش عند التسوق",
    "أطفئ الأنوار والأجهزة التي لا أستخدمها",
    "أغلق الصنبور أثناء غسل الأسنان",
    "أفصل القمامة العضوية عن الورق والبلاستيك",
    "أشتري بقدر حاجتي ولا أرمي الطعام",
    "أمشي أو أستخدم المواصلات العامة في المشاوير القريبة",
    "أصلح الأشياء أو أتبرع بها قبل أن أرميها",
    "أستخدم لمبات LED في البيت",
    "أزرع نبتة أو أشارك في حملة تنظيف"
  ];
  var $ = function (id) { return document.getElementById(id); };

  /* water-drop grid: 3 of 100 filled */
  var grid = $("drops");
  for (var i = 0; i < 100; i++) {
    var d = document.createElement("i");
    if (i < 3) d.className = "on";
    grid.appendChild(d);
  }

  /* habits */
  var checked = {};
  try { checked = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { checked = {}; }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(checked)); } catch (e) {} }

  var list = $("habits-list");
  var inputs = [];
  HABITS.forEach(function (text, idx) {
    var li = document.createElement("li");
    var label = document.createElement("label");
    var input = document.createElement("input");
    input.type = "checkbox"; input.id = "habit-" + idx; input.checked = !!checked[idx];
    var box = document.createElement("span"); box.className = "box";
    box.innerHTML = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-7"/></svg>';
    var txt = document.createElement("span"); txt.className = "txt"; txt.textContent = text;
    label.appendChild(input); label.appendChild(box); label.appendChild(txt);
    li.appendChild(label); list.appendChild(li);
    input.addEventListener("change", function () {
      if (input.checked) checked[idx] = true; else delete checked[idx];
      persist(); update();
    });
    inputs.push(input);
  });

  function message(n) {
    var t = HABITS.length;
    if (n === 0) return "اختر عادة واحدة تمارسها بالفعل، وابدأ منها.";
    if (n < 4) return "بداية جيدة. أضف عادة جديدة هذا الأسبوع.";
    if (n < 8) return "أنت تفعل الكثير بالفعل. اختر عادة واحدة من الباقي لتجربها.";
    if (n < t) return "قريب جداً من الاكتمال. شارك هذه العادات مع من حولك.";
    return "كل العادات في قائمتك. الخطوة التالية أن تنقلها إلى أسرتك وأصدقائك.";
  }
  function update() {
    var n = inputs.filter(function (i) { return i.checked; }).length;
    var t = HABITS.length;
    $("done").textContent = n; $("total").textContent = t;
    $("fill").style.width = (n / t * 100) + "%";
    $("bar").setAttribute("aria-valuenow", n); $("bar").setAttribute("aria-valuemax", t);
    $("msg").textContent = message(n);
  }
  $("reset").addEventListener("click", function () {
    checked = {}; inputs.forEach(function (i) { i.checked = false; });
    persist(); update();
  });
  update();

  /* theme */
  var root = document.documentElement;
  $("theme").addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.setAttribute("data-theme", dark ? "light" : "dark");
  });
})();
 
    
    function myFunction() {
  alert("شكرا لك لحفاظ علي البيئة✅");
}