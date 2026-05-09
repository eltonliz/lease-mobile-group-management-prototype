(() => {
  const roles = [
    { id: "buyer", name: "普通客户", scope: "个人身份", desc: "只查看自己的消息和已加入群聊，不参与门店群维护" },
    { id: "staff", name: "南山店员", scope: "南山门店", desc: "切换到店员身份后，可查看本门店自动创建的客户群" },
    { id: "manager", name: "南山店长", scope: "南山门店", desc: "作为门店群群管，维护本店白名单客户与群内沟通" },
    { id: "agent", name: "华南代理", scope: "A / B / C 门店", desc: "代理邀请的门店会自动生成门店客户群，代理为群主" }
  ];

  const groups = [
    {
      id: "g1",
      name: "南山门店客户群",
      type: "门店群",
      source: "南山门店",
      owner: "华南代理",
      managers: "王店长、李店员",
      customers: 221,
      members: 224,
      internal: 3,
      excluded: 9,
      pending: 0,
      status: "已自动创建",
      tone: "green",
      filter: "store",
      visible: ["agent", "staff", "manager"],
      letter: "N",
      summary: "切换到南山门店身份后自动可见；白名单客户入群，黑名单客户不入群。",
      stage: "白名单客户群",
      latest: "今天 10:20"
    },
    {
      id: "g2",
      name: "福田旗舰店客户群",
      type: "门店群",
      source: "福田旗舰店",
      owner: "华南代理",
      managers: "陈店长",
      customers: 501,
      members: 503,
      internal: 2,
      excluded: 16,
      pending: 0,
      status: "已自动创建",
      tone: "green",
      filter: "store",
      visible: ["agent"],
      letter: "F",
      summary: "代理身份下自动生成的门店群；店长为群管，客户来自该门店白名单。",
      stage: "白名单客户群",
      latest: "昨天 18:02"
    },
    {
      id: "g3",
      name: "宝安 A 店客户群",
      type: "门店群",
      source: "宝安 A 店",
      owner: "华南代理",
      managers: "许店长",
      customers: 168,
      members: 171,
      internal: 3,
      excluded: 4,
      pending: 0,
      status: "已自动创建",
      tone: "green",
      filter: "store",
      visible: ["agent"],
      letter: "B",
      summary: "代理拓展门店后生成客户群，群主为代理，店长和店员为群管。",
      stage: "白名单客户群",
      latest: "05-08 16:30"
    },
    {
      id: "g4",
      name: "我的租赁咨询群",
      type: "普通群聊",
      source: "客户主动加入",
      owner: "系统客服",
      managers: "客服助手",
      customers: 12,
      members: 13,
      internal: 1,
      excluded: 0,
      pending: 0,
      status: "已加入",
      tone: "blue",
      filter: "joined",
      visible: ["buyer", "staff", "manager", "agent"],
      letter: "W",
      summary: "普通客户身份下可查看自己已加入的群聊。",
      stage: "我加入的群",
      latest: "今天 09:45"
    },
    {
      id: "g5",
      name: "华南代理门店协同群",
      type: "代理群",
      source: "华南代理",
      owner: "华南代理负责人",
      managers: "下级门店店长",
      customers: 0,
      members: 86,
      internal: 86,
      excluded: 0,
      pending: 0,
      status: "正常",
      tone: "green",
      filter: "managed",
      visible: ["agent"],
      letter: "H",
      summary: "代理与门店的内部协同群，无客户成员。",
      stage: "内部协同",
      latest: "05-07 20:12"
    }
  ];

  const customers = [
    { id: "c1", name: "陈世敏", phone: "登录后可见", store: "南山门店", owner: "王店长", type: "白名单客户", groupId: "g1", status: "已入群", letter: "C" },
    { id: "c2", name: "程婷婷", phone: "登录后可见", store: "南山门店", owner: "李店员", type: "白名单客户", groupId: "g1", status: "已入群", letter: "C" },
    { id: "c3", name: "赵立民", phone: "登录后可见", store: "福田旗舰店", owner: "陈店长", type: "白名单客户", groupId: "g2", status: "已入群", letter: "Z" },
    { id: "c4", name: "李杰", phone: "登录后可见", store: "宝安 A 店", owner: "许店长", type: "白名单客户", groupId: "g3", status: "已入群", letter: "L" },
    { id: "c5", name: "钱韵澄", phone: "不可见", store: "南山门店", owner: "王店长", type: "黑名单", groupId: "g1", status: "不入群", letter: "Q" },
    { id: "c6", name: "王店长", phone: "内部成员", store: "南山门店", owner: "华南代理", type: "群管", groupId: "g1", status: "可管理", letter: "W" }
  ];

  const tasks = [
    { id: "t1", customerId: "c1", title: "徐世敏", desc: "好久不见，加个微信，有空聚聚呀", status: "待确认", tone: "amber" },
    { id: "t2", customerId: "c6", title: "王店长", desc: "南山门店群管身份已生效", status: "已添加", tone: "green" },
    { id: "t3", customerId: "c5", title: "钱韵澄", desc: "该客户在黑名单内，不进入门店客户群", status: "不入群", tone: "red" }
  ];

  const state = {
    screen: "home",
    role: "staff",
    filter: "all",
    customerFilter: "all",
    query: "",
    groupId: "g1",
    customerId: "c1",
    history: [],
    plus: false,
    sheet: null,
    toast: "",
    remark: "重点服务群",
    muted: false,
    synced: {},
    chatInput: "",
    toolsOpen: true,
    messages: [
      { groupId: "g1", from: "王店长", role: "群管", text: "今天新进白名单客户已经在群里了，黑名单客户不会展示。", mine: false },
      { groupId: "g1", from: "我", role: "店员", text: "收到，我先在群里回复客户咨询。", mine: true },
      { groupId: "g1", from: "华南代理", role: "群主", text: "南山门店有问题直接在这个群里沟通。", mine: false }
    ]
  };

  const currentRole = () => roles.find(item => item.id === state.role) || roles[0];
  const groupById = id => groups.find(item => item.id === id) || groups[0];
  const customerById = id => customers.find(item => item.id === id) || customers[0];
  const visibleGroups = () => groups.filter(group => group.visible.includes(state.role));
  const visibleCustomers = () => customers.filter(customer => visibleGroups().some(group => group.id === customer.groupId));
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const toneFor = value => value.includes("待") ? "amber" : value.includes("黑名单") || value.includes("不入群") ? "red" : value.includes("群管") || value.includes("加入") ? "blue" : value.includes("已") || value.includes("正常") || value.includes("白名单") ? "green" : "gray";
  const initials = value => escapeHtml(String(value).slice(0, 2));

  function statusBar() {
    return `
      <div class="db-status">
        <span>09:41</span>
        <span class="db-sys"><span class="db-signal"><i></i><i></i><i></i><i></i></span><span>5G</span><span class="db-battery"></span></span>
      </div>
    `;
  }

  function icon(name) {
    const map = {
      home: "home",
      group: "group",
      customer: "customer",
      mine: "mine",
      discover: "group",
      message: "customer"
    };
    return `<span class="db-nav-icon ${map[name] || ""}"></span>`;
  }

  function badge(text, tone) {
    return `<span class="db-badge ${tone || toneFor(text)}">${escapeHtml(text)}</span>`;
  }

  function avatar(text, tone = "green", square = false) {
    return `<span class="db-avatar ${tone} ${square ? "square" : ""}">${initials(text)}</span>`;
  }

  function titleHead(title, opts = {}) {
    const right = opts.more ? `<button class="db-icon-btn db-more" data-action="${opts.more}"><span class="db-more-dots">...</span></button>` : opts.right || "";
    return `
      <div class="db-head-plain">
        <div class="db-title-row">
          ${opts.back ? `<button class="db-back" data-action="back">‹</button>` : ""}
          <h1 class="db-title">${escapeHtml(title)}</h1>
          ${right}
        </div>
        ${opts.sub ? `<div class="db-subtitle">${escapeHtml(opts.sub)}</div>` : ""}
      </div>
    `;
  }

  function mainHead(active = "home") {
    const role = currentRole();
    return `
      <div class="db-head">
        <div class="db-title-row">
          <div class="db-top-tabs">
            <button class="db-top-tab ${active === "messages" ? "active" : ""}" data-route="messages">消息</button>
            <button class="db-top-tab ${active === "home" ? "active" : ""}" data-route="home">通讯录</button>
          </div>
          <button class="db-icon-btn db-right" data-action="togglePlus"><span class="db-plus"></span></button>
        </div>
        <div class="db-subtitle">${escapeHtml(role.name)}｜${escapeHtml(role.scope)}</div>
        <button class="db-search db-search-as-button" data-action="openSearch">
          <span>⌕</span><span style="color:#b5bdc5;font-size:13px;">搜索联系人 / 群聊 / 门店</span>
        </button>
      </div>
    `;
  }

  function bottomNav(active) {
    const items = [
      { screen: "learn", label: "学习", iconName: "home", action: "navToast" },
      { screen: "discover", label: "发现", iconName: "discover", action: "navToast" },
      { screen: "home", label: "消息", iconName: "message", routeName: "messages" },
      { screen: "profile", label: "我的", iconName: "mine", routeName: "profile" }
    ];
    return `
      <nav class="db-bottom">
        ${items.map(item => `
          <button class="db-nav ${active === item.screen ? "active" : ""}" ${item.routeName ? `data-route="${item.routeName}"` : `data-action="${item.action}"`}>
            ${icon(item.iconName)}<span>${item.label}</span>
          </button>
        `).join("")}
      </nav>
    `;
  }

  function plusMenu() {
    if (!state.plus) return "";
    return `
      <div class="db-pop">
        <button data-action="openSearch">添加客户</button>
        <button data-route="tasks">新的朋友</button>
        <button data-action="roleSheet">切换身份</button>
      </div>
    `;
  }

  function homeScreen() {
    const groupsForRole = visibleGroups();
    const pendingTasks = tasks.filter(task => task.status === "待确认").length;
    return `
      <div class="db-page">
        ${statusBar()}
        ${mainHead("home")}
        <main class="db-scroll">
          <button class="db-entry" data-route="tasks">
            ${avatar("朋友", "green")}
            <span class="db-entry-main">
              <p class="db-entry-title">新的朋友</p>
              <p class="db-entry-sub">好友申请、客户申请、群管身份提醒</p>
            </span>
            <span class="db-count">${pendingTasks}</span>
          </button>
          <button class="db-entry" data-route="groups">
            ${avatar("群聊", "blue")}
            <span class="db-entry-main">
              <p class="db-entry-title">我的群聊</p>
              <p class="db-entry-sub">按当前身份展示自动创建或已加入的群</p>
            </span>
          </button>

          <section class="db-section">
            <div class="db-section-title">常用群</div>
            ${groupsForRole.slice(0, 4).map(groupEntry).join("")}
          </section>
        </main>
        <div class="db-alpha">A<br>B<br>C<br>D<br>F<br>H<br>K<br>M<br>N<br>S<br>Z<br>#</div>
        ${bottomNav("home")}
        ${plusMenu()}
        ${toast()}
      </div>
    `;
  }

  function messagesScreen() {
    const latestGroups = visibleGroups().slice(0, 3);
    return `
      <div class="db-page">
        ${statusBar()}
        ${mainHead("messages")}
        <main class="db-scroll">
          <section class="db-section">
            <div class="db-section-title">站内消息</div>
            <button class="db-entry" data-action="navToast">
              ${avatar("通知", "green")}
              <span class="db-entry-main">
                <p class="db-entry-title">系统通知</p>
                <p class="db-entry-sub">身份切换、群创建、群管变更等提醒</p>
              </span>
            </button>
            <button class="db-entry" data-action="navToast">
              ${avatar("客服", "blue")}
              <span class="db-entry-main">
                <p class="db-entry-title">客服消息</p>
                <p class="db-entry-sub">订单咨询和服务提醒仍走原消息体系</p>
              </span>
            </button>
          </section>
          <section class="db-section">
            <div class="db-section-title">最近群聊</div>
            ${latestGroups.map(groupEntry).join("")}
          </section>
        </main>
        ${bottomNav("home")}
        ${plusMenu()}
        ${toast()}
      </div>
    `;
  }

  function infoRow(label, value) {
    return `<div class="db-info-row"><span>${escapeHtml(label)}</span><span>${escapeHtml(value)}</span></div>`;
  }

  function groupEntry(group) {
    return `
      <button class="db-entry" data-action="openGroup" data-group="${group.id}">
        ${avatar(group.name, group.filter === "joined" ? "blue" : group.filter === "managed" ? "violet" : "green", true)}
        <span class="db-entry-main">
          <p class="db-entry-title">${escapeHtml(group.name)}</p>
          <p class="db-entry-sub">${escapeHtml(group.type)}｜${escapeHtml(group.source)}｜群主：${escapeHtml(group.owner)}</p>
          <span class="db-entry-meta">
            ${group.customers ? badge(`白名单 ${group.customers}`, "green") : badge("内部协同", "violet")}
            ${group.excluded ? badge(`黑名单排除 ${group.excluded}`, "red") : ""}
            ${badge(group.stage, group.filter === "joined" ? "blue" : "")}
          </span>
        </span>
      </button>
    `;
  }

  function groupsScreen() {
    const tabs = [["all", "全部"], ["store", "门店群"], ["managed", "我管理"], ["joined", "我加入"]];
    const list = visibleGroups().filter(group => state.filter === "all" || group.filter === state.filter || (state.filter === "managed" && ["store", "managed"].includes(group.filter)));
    return `
      <div class="db-page db-soft">
        ${statusBar()}
        ${mainHead("home")}
        <main class="db-scroll">
          <div class="db-filter">
            ${tabs.map(([id, label]) => `<button class="${state.filter === id ? "active" : ""}" data-action="filter" data-filter="${id}">${label}</button>`).join("")}
          </div>
          <section class="db-section">
            <div class="db-section-title">${tabs.find(tab => tab[0] === state.filter)?.[1] || "全部"} ${list.length} 个</div>
            ${list.map(groupCard).join("")}
          </section>
        </main>
        ${bottomNav("home")}
        ${plusMenu()}
        ${toast()}
      </div>
    `;
  }

  function groupCard(group) {
    return `
      <article class="db-card">
        <button class="db-entry" data-action="openGroup" data-group="${group.id}" style="min-height:auto;">
          <span class="db-entry-main">
            <p class="db-entry-title">${escapeHtml(group.name)}</p>
            <p class="db-entry-sub">${escapeHtml(group.type)}｜来源：${escapeHtml(group.source)}<br>群主：${escapeHtml(group.owner)}｜群管：${escapeHtml(group.managers)}</p>
            <span class="db-entry-meta">
              ${group.customers ? badge(`白名单 ${group.customers}`, "green") : badge("无客户成员", "gray")}
              ${badge(`群管 ${group.internal}`, "blue")}
              ${group.excluded ? badge(`黑名单排除 ${group.excluded}`, "red") : ""}
              ${badge(group.status, group.tone)}
            </span>
          </span>
        </button>
        <div class="db-actions">
          <button class="db-action" data-action="openGroup" data-group="${group.id}">群详情</button>
          <button class="db-action" data-action="openChat" data-group="${group.id}">群聊</button>
          <button class="db-action" data-action="sourceToast" data-group="${group.id}">创建规则</button>
          <button class="db-secondary" style="height:40px;font-size:13px;" data-action="openSettings" data-group="${group.id}">群设置</button>
        </div>
      </article>
    `;
  }

  function customersScreen() {
    const tabs = [["all", "全部"], ["白名单客户", "白名单"], ["群管", "群管"], ["黑名单", "黑名单"]];
    const list = visibleCustomers().filter(item => state.customerFilter === "all" || item.type === state.customerFilter);
    return `
      <div class="db-page">
        ${statusBar()}
        <div class="db-head">
          <div class="db-title-row">
            <h1 class="db-title">通讯录</h1>
            <button class="db-icon-btn db-right" data-action="togglePlus"><span class="db-plus"></span></button>
          </div>
          <button class="db-search db-search-as-button" data-action="openSearch">
            <span>⌕</span><span style="color:#b5bdc5;font-size:13px;">搜索客户 / 门店 / 群聊</span>
          </button>
        </div>
        <main class="db-scroll">
          <div class="db-filter">
            ${tabs.map(([id, label]) => `<button class="${state.customerFilter === id ? "active" : ""}" data-action="customerFilter" data-filter="${id}">${label}</button>`).join("")}
          </div>
          <section class="db-section">
            <div class="db-section-title">C</div>
            ${list.map(customerEntry).join("")}
          </section>
        </main>
        <div class="db-alpha">A<br>B<br>C<br>D<br>E<br>F<br>G<br>H<br>J<br>L<br>Q<br>S<br>Z<br>#</div>
        ${bottomNav("home")}
        ${plusMenu()}
        ${toast()}
      </div>
    `;
  }

  function customerEntry(customer) {
    return `
      <button class="db-entry" data-action="openCustomer" data-customer="${customer.id}">
        ${avatar(customer.name, customer.type === "黑名单" ? "red" : customer.type === "群管" ? "blue" : "green")}
        <span class="db-entry-main">
          <p class="db-entry-title">${escapeHtml(customer.name)}</p>
          <p class="db-entry-sub">${escapeHtml(customer.store)}｜服务人：${escapeHtml(customer.owner)}</p>
          <span class="db-entry-meta">${badge(customer.type)}${badge(customer.status)}</span>
        </span>
      </button>
    `;
  }

  function searchScreen() {
    const q = state.query.trim();
    const hasQuery = q.length > 0;
    const groupResults = hasQuery ? visibleGroups().filter(item => [item.name, item.type, item.source, item.owner].join("").includes(q)) : [];
    const customerResults = hasQuery ? visibleCustomers().filter(item => [item.name, item.store, item.type].join("").includes(q)) : [];
    const empty = hasQuery && !groupResults.length && !customerResults.length;
    return `
      <div class="db-page">
        ${statusBar()}
        <div class="db-head-plain">
          <div class="db-title-row" style="justify-content:flex-start;gap:8px;">
            <button class="db-back" data-action="back" style="position:static;">‹</button>
            <label class="db-search" style="flex:1;margin-top:0;">
              <span>⌕</span>
              <input id="dbSearchInput" value="${escapeHtml(state.query)}" placeholder="请输入您要搜索的关键字" autofocus>
              ${state.query ? `<button class="db-icon-btn" data-action="clearSearch" style="width:24px;height:24px;background:#eef0f2;">×</button>` : ""}
            </label>
          </div>
        </div>
        <main class="db-scroll no-nav">
          ${!hasQuery ? "" : empty ? emptyState("未搜索到联系人或群聊") : `
            ${customerResults.length ? `<section class="db-section"><div class="db-section-title">联系人</div>${customerResults.slice(0, 3).map(customerEntry).join("")}</section>` : ""}
            ${groupResults.length ? `<section class="db-section"><div class="db-section-title">群聊</div>${groupResults.slice(0, 4).map(groupEntry).join("")}</section>` : ""}
          `}
        </main>
        ${toast()}
      </div>
    `;
  }

  function emptyState(text) {
    return `<div class="db-empty"><div class="db-empty-illus"></div><div>${escapeHtml(text)}</div></div>`;
  }

  function groupDetailScreen() {
    const group = groupById(state.groupId);
    return `
      <div class="db-page db-soft">
        ${statusBar()}
        ${titleHead("群详情", { back: true, more: "openSettings" })}
        <main class="db-scroll no-nav">
          <section class="db-detail-hero">
            <div class="db-detail-person">
              ${avatar(group.name, group.filter === "joined" ? "blue" : group.filter === "managed" ? "violet" : "green")}
              <div>
                <h2 class="db-detail-name">${escapeHtml(group.name)}</h2>
                <p class="db-detail-text">${escapeHtml(group.type)}｜${escapeHtml(group.source)}<br>群主：${escapeHtml(group.owner)}</p>
              </div>
            </div>
            <div class="db-actions" style="padding:0 18px;">
              <button class="db-secondary" data-action="openChat" data-group="${group.id}">发消息</button>
              <button class="db-secondary" data-action="callSheet">语音/视频</button>
            </div>
          </section>
          <section class="db-section">
            <div class="db-info-list">
              ${infoRow("白名单客户", `${group.customers} 位`)}
              ${infoRow("群管", group.managers)}
              ${infoRow("黑名单排除", `${group.excluded} 位`)}
              ${infoRow("创建规则", group.filter === "store" ? "切换门店/代理身份后自动创建" : "按当前身份可见")}
              ${infoRow("最近消息", group.latest)}
              ${infoRow("手机号展示", "客户登录或授权前不可见")}
            </div>
          </section>
          <section class="db-section">
            <div class="db-actions">
              <button class="db-primary" data-action="openChat" data-group="${group.id}">进入群聊</button>
              <button class="db-secondary" data-action="sourceToast">查看来源</button>
            </div>
          </section>
        </main>
        ${sheet()}
        ${toast()}
      </div>
    `;
  }

  function customerDetailScreen() {
    const customer = customerById(state.customerId);
    const group = groupById(customer.groupId);
    return `
      <div class="db-page db-soft">
        ${statusBar()}
        ${titleHead("客户详情", { back: true })}
        <main class="db-scroll no-nav">
          <section class="db-detail-hero">
            <div class="db-detail-person">
              ${avatar(customer.name, customer.type === "黑名单" ? "red" : customer.type === "群管" ? "blue" : "green")}
              <div>
                <h2 class="db-detail-name">${escapeHtml(customer.name)}</h2>
              <p class="db-detail-text">所属门店：${escapeHtml(customer.store)}<br>手机号：${escapeHtml(customer.phone)}</p>
              </div>
            </div>
            <div class="db-actions" style="padding:0 18px;">
              <button class="db-secondary" data-action="openChat" data-group="${group.id}">发消息</button>
              <button class="db-secondary" data-action="openGroup" data-group="${group.id}">所在群</button>
            </div>
          </section>
          <section class="db-section">
            <div class="db-info-list">
              ${infoRow("所属门店", customer.store)}
              ${infoRow("服务人", customer.owner)}
              ${infoRow("客户类型", customer.type)}
              ${infoRow("入群状态", customer.status)}
              ${infoRow("所在群", group.name)}
            </div>
          </section>
        </main>
        ${toast()}
      </div>
    `;
  }

  function tasksScreen() {
    const visible = tasks;
    return `
      <div class="db-page">
        ${statusBar()}
        ${titleHead("新的朋友", { back: true, right: `<button class="db-icon-btn db-right" data-action="openSearch" style="color:#22c7a5;font-size:13px;font-weight:800;width:auto;">添加客户</button>` })}
        <main class="db-scroll no-nav">
          ${visible.length ? visible.map(task => {
            const customer = customerById(task.customerId);
            return `
              <button class="db-entry" data-action="openCustomer" data-customer="${customer.id}">
                ${avatar(customer.name, task.tone)}
                <span class="db-entry-main">
                  <p class="db-entry-title">${escapeHtml(task.title)}</p>
                  <p class="db-entry-sub">${escapeHtml(task.desc)}</p>
                </span>
                ${badge(task.status, task.tone)}
              </button>
            `;
          }).join("") : emptyState("暂无新的朋友")}
        </main>
        ${toast()}
      </div>
    `;
  }

  function syncScreen() {
    const group = groupById(state.groupId);
    return `
      <div class="db-page db-soft">
        ${statusBar()}
        ${titleHead("群创建规则", { back: true })}
        <main class="db-scroll no-nav">
          <section class="db-detail-hero">
            <div class="db-detail-person">
              ${avatar(group.name, "green")}
              <div>
                <h2 class="db-detail-name">${escapeHtml(group.name)}</h2>
                <p class="db-detail-text">${escapeHtml(group.source)}<br>${escapeHtml(group.summary)}</p>
              </div>
            </div>
          </section>
          <section class="db-section">
            <div class="db-section-title">规则说明</div>
            <div class="db-card">
              <p class="db-entry-title" style="font-size:14px;">按身份和门店关系自动展示</p>
              <p class="db-entry-sub">普通客户只看自己加入的群；店员、店长只看当前门店客户群；代理可看自己邀请门店下的客户群。白名单客户进入群聊，黑名单客户不展示。</p>
              <div class="db-entry-meta">
                ${badge("自动创建", "green")}
                ${badge("黑名单排除", "red")}
                ${badge("按身份可见", "blue")}
              </div>
            </div>
          </section>
          <section class="db-section">
            <button class="db-primary" style="width:100%;" data-action="openGroup" data-group="${group.id}">返回群详情</button>
          </section>
        </main>
        ${toast()}
      </div>
    `;
  }

  function settingsScreen() {
    const group = groupById(state.groupId);
    return `
      <div class="db-page db-soft">
        ${statusBar()}
        ${titleHead("群设置", { back: true })}
        <main class="db-scroll no-nav">
          <div class="db-info-list">
            <button class="db-info-row" data-action="remarkSheet"><span>设置群备注</span><span>${escapeHtml(state.remark)} ›</span></button>
            <button class="db-info-row" data-action="toggleMute"><span>消息免打扰</span><span>${state.muted ? "已开启" : "未开启"}</span></button>
            <div class="db-info-row"><span>当前群主</span><span>${escapeHtml(group.owner)}</span></div>
          </div>
          <button class="db-danger" style="width:100%;margin-top:18px;" data-action="disableSheet">停用群</button>
        </main>
        ${sheet()}
        ${toast()}
      </div>
    `;
  }

  function chatScreen() {
    const group = groupById(state.groupId);
    const list = state.messages.filter(item => item.groupId === group.id);
    const messages = list.length ? list : [{ groupId: group.id, from: "系统", role: "通讯录助手", text: `${group.name}暂无群消息，群成员会按当前身份和门店关系自动展示。`, mine: false, system: true }];
    return `
      <div class="db-page db-chat-body">
        ${statusBar()}
        ${titleHead(group.name, { back: true, more: "openSettings" })}
        <main class="db-scroll with-composer">
          <div class="db-chat-day">2026-05-09 09:41</div>
          ${messages.map(messageView).join("")}
          <button class="db-material" data-action="toolMessage" data-type="素材库">素材库</button>
        </main>
        <div class="db-composer">
          <div class="db-input-row">
            <button class="db-round" data-action="voiceMessage">≋</button>
            <input id="dbChatInput" class="db-chat-input" value="${escapeHtml(state.chatInput)}" placeholder="请输入..." />
            <button class="db-round" data-action="toggleTools">＋</button>
            <button class="db-send" data-action="sendText">发送</button>
          </div>
          <div class="db-tool-grid ${state.toolsOpen ? "show" : ""}">
            ${toolButton("照片", "□")}
            ${toolButton("文件", "▤")}
            ${toolButton("语音", "≋")}
            ${toolButton("相机", "◉")}
            ${toolButton("语音通话", "☎")}
            ${toolButton("视频通话", "▣")}
          </div>
        </div>
        ${toast()}
      </div>
    `;
  }

  function toolButton(label, mark) {
    return `<button class="db-tool" data-action="toolMessage" data-type="${label}"><span class="db-tool-box">${mark}</span>${label}</button>`;
  }

  function messageView(message) {
    if (message.system) {
      return `<div class="db-system-msg">${escapeHtml(message.text)}</div>`;
    }
    return `
      <div class="db-message ${message.mine ? "mine" : ""}">
        ${message.mine ? "" : avatar(message.from, "blue")}
        <div class="db-msg-main">
          <div class="db-msg-name">${escapeHtml(message.from)} · ${escapeHtml(message.role || "成员")}</div>
          <div class="db-bubble">${escapeHtml(message.text)}</div>
        </div>
        ${message.mine ? avatar("我", "green") : ""}
      </div>
    `;
  }

  function profileScreen() {
    const role = currentRole();
    return `
      <div class="db-page db-soft">
        ${statusBar()}
        ${titleHead("我的", { sub: `${role.name}｜${role.scope}` })}
        <main class="db-scroll">
          <section class="db-detail-hero">
            <div class="db-detail-person">
              ${avatar(role.name, "green")}
              <div>
                <h2 class="db-detail-name">${escapeHtml(role.name)}</h2>
                <p class="db-detail-text">${escapeHtml(role.desc)}</p>
              </div>
            </div>
          </section>
          <section class="db-section">
            <div class="db-info-list">
              ${roles.map(item => `<button class="db-info-row" data-action="setRole" data-role="${item.id}"><span>${escapeHtml(item.name)}</span><span>${item.id === state.role ? "当前" : "切换"} ›</span></button>`).join("")}
            </div>
          </section>
          <section class="db-section">
            <div class="db-info-list">
              ${infoRow("可见群聊", role.id === "buyer" ? "已加入群聊" : "当前身份关联群")}
              ${infoRow("客户范围", role.id === "buyer" ? "不展示门店客户" : "门店白名单客户")}
              ${infoRow("群权限", role.id === "agent" ? "群主" : ["staff", "manager"].includes(role.id) ? "群管" : "无")}
              ${infoRow("当前方案", "消息侧通讯录与群聊")}
            </div>
          </section>
        </main>
        ${bottomNav("profile")}
        ${toast()}
      </div>
    `;
  }

  function sheet() {
    if (!state.sheet) return "";
    if (state.sheet === "call") {
      return `
        <div class="db-sheet-mask">
          <div class="db-sheet">
            <button class="db-secondary" style="width:100%;" data-action="sheetToast">视频通话</button>
            <button class="db-secondary" style="width:100%;margin-top:10px;" data-action="sheetToast">语音通话</button>
            <button class="db-action" style="width:100%;margin-top:12px;" data-action="closeSheet">取消</button>
          </div>
        </div>
      `;
    }
    if (state.sheet === "remark") {
      return `
        <div class="db-sheet-mask">
          <div class="db-sheet">
            <div class="db-sheet-title">修改群备注名</div>
            <input id="dbRemarkInput" class="db-chat-input" style="width:100%;height:46px;" value="${escapeHtml(state.remark)}">
            <div class="db-actions">
              <button class="db-secondary" data-action="closeSheet">取消</button>
              <button class="db-primary" data-action="saveRemark">确认</button>
            </div>
          </div>
        </div>
      `;
    }
    if (state.sheet === "disable") {
      return `
        <div class="db-sheet-mask">
          <div class="db-sheet">
            <div class="db-sheet-title">请再次确认是否停用该群</div>
            <p class="db-entry-sub" style="text-align:center;">停用后不再展示在通讯录中，但保留历史聊天记录。</p>
            <div class="db-actions">
              <button class="db-secondary" data-action="closeSheet">取消</button>
              <button class="db-danger" data-action="disableGroup">确认</button>
            </div>
          </div>
        </div>
      `;
    }
    if (state.sheet === "role") {
      return `
        <div class="db-sheet-mask">
          <div class="db-sheet">
            <div class="db-sheet-title">切换身份</div>
            <div class="db-info-list">
              ${roles.map(item => `<button class="db-info-row" data-action="setRole" data-role="${item.id}"><span>${escapeHtml(item.name)}</span><span>${item.id === state.role ? "当前" : "切换"} ›</span></button>`).join("")}
            </div>
            <button class="db-action" style="width:100%;margin-top:12px;" data-action="closeSheet">取消</button>
          </div>
        </div>
      `;
    }
    return "";
  }

  function toast() {
    return state.toast ? `<div class="db-toast">${escapeHtml(state.toast)}</div>` : "";
  }

  function render() {
    const screen = {
      messages: messagesScreen,
      home: homeScreen,
      groups: groupsScreen,
      customers: customersScreen,
      search: searchScreen,
      groupDetail: groupDetailScreen,
      customerDetail: customerDetailScreen,
      tasks: tasksScreen,
      sync: syncScreen,
      settings: settingsScreen,
      chat: chatScreen,
      profile: profileScreen
    }[state.screen] || homeScreen;
    document.body.className = "design-business-body";
    document.body.innerHTML = `<div class="db-phone">${screen()}</div>`;
    const searchInput = document.getElementById("dbSearchInput");
    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    }
    const chatInput = document.getElementById("dbChatInput");
    if (chatInput) chatInput.focus();
  }

  function snapshot() {
    return {
      screen: state.screen,
      query: state.query,
      groupId: state.groupId,
      customerId: state.customerId,
      filter: state.filter,
      customerFilter: state.customerFilter
    };
  }

  function restore(entry) {
    state.screen = entry.screen || "home";
    state.query = entry.query || "";
    state.groupId = entry.groupId || state.groupId;
    state.customerId = entry.customerId || state.customerId;
    state.filter = entry.filter || state.filter;
    state.customerFilter = entry.customerFilter || state.customerFilter;
    state.plus = false;
    state.sheet = null;
    render();
  }

  function route(screen, params = {}) {
    if (params.reset) state.history = [];
    if (!params.replace && !params.reset && state.screen !== screen) state.history.push(snapshot());
    if (!["search"].includes(screen)) state.query = "";
    state.plus = false;
    state.sheet = null;
    state.screen = screen;
    if (params.groupId) state.groupId = params.groupId;
    if (params.customerId) state.customerId = params.customerId;
    render();
  }

  function goBack() {
    const entry = state.history.pop();
    if (entry) {
      restore(entry);
      return;
    }
    route("home", { reset: true, replace: true });
  }

  function showToast(text) {
    state.toast = text;
    render();
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      state.toast = "";
      render();
    }, 1300);
  }

  document.addEventListener("click", event => {
    const el = event.target.closest("[data-route],[data-action]");
    if (!el) return;
    const routeName = el.dataset.route;
    if (routeName) {
      route(routeName, { reset: ["messages", "home", "groups", "customers", "profile"].includes(routeName) });
      return;
    }
    const action = el.dataset.action;
    if (action === "togglePlus") { state.plus = !state.plus; render(); return; }
    if (action === "openSearch") { route("search"); return; }
    if (action === "clearSearch") { state.query = ""; render(); return; }
    if (action === "back") { goBack(); return; }
    if (action === "filter") { state.filter = el.dataset.filter || "all"; render(); return; }
    if (action === "customerFilter") { state.customerFilter = el.dataset.filter || "all"; render(); return; }
    if (action === "openGroup") { route("groupDetail", { groupId: el.dataset.group }); return; }
    if (action === "openCustomer") { route("customerDetail", { customerId: el.dataset.customer }); return; }
    if (action === "openChat") { route("chat", { groupId: el.dataset.group || state.groupId }); return; }
    if (action === "openSync") { route("sync", { groupId: el.dataset.group || state.groupId }); return; }
    if (action === "openSettings") { route("settings", { groupId: el.dataset.group || state.groupId }); return; }
    if (action === "sourceToast") { showToast("群聊由身份、门店和白名单关系自动生成"); return; }
    if (action === "roleSheet") { state.plus = false; state.sheet = "role"; render(); return; }
    if (action === "setRole") {
      state.role = el.dataset.role || state.role;
      state.groupId = visibleGroups()[0]?.id || state.groupId;
      state.filter = "all";
      state.customerFilter = "all";
      state.sheet = null;
      showToast("身份已切换");
      return;
    }
    if (action === "navToast") { showToast("当前先聚焦消息侧通讯录"); return; }
    if (action === "callSheet") { state.sheet = "call"; render(); return; }
    if (action === "remarkSheet") { state.sheet = "remark"; render(); return; }
    if (action === "disableSheet") { state.sheet = "disable"; render(); return; }
    if (action === "closeSheet") { state.sheet = null; render(); return; }
    if (action === "toggleMute") { state.muted = !state.muted; showToast(state.muted ? "已开启消息免打扰" : "已关闭消息免打扰"); return; }
    if (action === "saveRemark") {
      const input = document.getElementById("dbRemarkInput");
      const value = (input?.value || "").trim();
      if (value.length < 2 || value.length > 12) { showToast("名称长度限制 2-12 字"); return; }
      state.remark = value;
      state.sheet = null;
      showToast("备注已更新");
      return;
    }
    if (action === "disableGroup") { state.sheet = null; showToast("群已停用，历史记录仍保留"); return; }
    if (action === "sheetToast") { state.sheet = null; showToast("正在发起通话"); return; }
    if (action === "confirmSync") {
      const group = groupById(el.dataset.group || state.groupId);
      state.synced[group.id] = true;
      showToast("已确认");
      return;
    }
    if (action === "escalateSync") { showToast("已提交上级处理"); return; }
    if (action === "rejectSync") { showToast("已拒绝本次变更"); return; }
    if (action === "sendText") {
      const input = document.getElementById("dbChatInput");
      const text = (input?.value || state.chatInput || "").trim();
      if (!text) { showToast("请输入消息内容"); return; }
      state.messages.push({ groupId: state.groupId, from: "我", role: currentRole().name, text, mine: true });
      state.chatInput = "";
      render();
      return;
    }
    if (action === "toggleTools") { state.toolsOpen = !state.toolsOpen; render(); return; }
    if (action === "voiceMessage") {
      state.messages.push({ groupId: state.groupId, from: "我", role: currentRole().name, text: "语音消息 12 秒", mine: true });
      render();
      return;
    }
    if (action === "toolMessage") {
      const type = el.dataset.type || "附件";
      state.messages.push({ groupId: state.groupId, from: "我", role: currentRole().name, text: `${type}已发送`, mine: true });
      render();
    }
  });

  document.addEventListener("input", event => {
    if (event.target?.id === "dbSearchInput") {
      state.query = event.target.value;
      render();
    }
    if (event.target?.id === "dbChatInput") {
      state.chatInput = event.target.value;
    }
  });

  render();
})();
