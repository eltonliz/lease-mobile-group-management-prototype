(() => {
  const roles = [
    { id: "agent", name: "华南代理负责人", scope: "下级 28 家门店", desc: "可查看下级门店群、直播群、课程群，可处理同步与异常" },
    { id: "store", name: "南山店长", scope: "南山门店", desc: "可管理本门店客户群，处理本店客户同步" },
    { id: "anchor", name: "主播小李", scope: "五一租赁专场", desc: "可管理直播群，查看直播覆盖客户和服务链路" },
    { id: "course", name: "课程负责人", scope: "设备租赁基础课", desc: "可管理课程群，查看录播内容和课程客户" }
  ];

  const groups = [
    {
      id: "g1",
      name: "南山门店客户群",
      type: "门店群",
      source: "南山门店",
      owner: "王店长",
      customers: 221,
      members: 238,
      internal: 17,
      pending: 23,
      status: "待人工确认",
      tone: "amber",
      filter: "store",
      letter: "N",
      summary: "新增客户 20 人，移除客户 3 人，新增店员 1 人",
      stage: "门店客户经营",
      latest: "今天 10:20"
    },
    {
      id: "g2",
      name: "五一租赁专场直播群",
      type: "直播群",
      source: "五一租赁专场直播间",
      owner: "主播小李",
      customers: 352,
      members: 387,
      internal: 35,
      pending: 42,
      status: "进行中",
      tone: "green",
      filter: "live",
      letter: "Z",
      summary: "覆盖门店新增 2 家，去重后新增客户 42 人",
      stage: "售前｜售中｜售后",
      latest: "今天 11:42"
    },
    {
      id: "g3",
      name: "福田旗舰店客户群",
      type: "门店群",
      source: "福田旗舰店",
      owner: "待重新指定",
      customers: 501,
      members: 512,
      internal: 11,
      pending: 6,
      status: "群主异常",
      tone: "red",
      filter: "store",
      letter: "F",
      summary: "原群主账号停用，建议代理或新店长重新指定群主",
      stage: "异常待处理",
      latest: "昨天 18:02"
    },
    {
      id: "g4",
      name: "设备租赁使用课程群",
      type: "课程群",
      source: "设备租赁基础课",
      owner: "课程负责人张三",
      customers: 180,
      members: 188,
      internal: 8,
      pending: 7,
      status: "分级同步",
      tone: "violet",
      filter: "course",
      letter: "K",
      summary: "课程可见门店新增 1 家，黑名单客户 6 人已排除",
      stage: "录播内容触达",
      latest: "今天 09:45"
    },
    {
      id: "g5",
      name: "华南代理门店协同群",
      type: "代理群",
      source: "华南代理",
      owner: "华南代理负责人",
      customers: 0,
      members: 86,
      internal: 86,
      pending: 0,
      status: "正常",
      tone: "green",
      filter: "mine",
      letter: "H",
      summary: "代理与门店协同通知群，无客户成员",
      stage: "内部协同",
      latest: "05-07 20:12"
    }
  ];

  const customers = [
    { id: "c1", name: "陈世敏", phone: "130 3325 8577", store: "南山门店", owner: "王店长", type: "门店客户", groupId: "g1", status: "待加入", letter: "C" },
    { id: "c2", name: "程婷婷", phone: "138 2290 1121", store: "南山门店", owner: "李店员", type: "直播客户", groupId: "g2", status: "售前咨询", letter: "C" },
    { id: "c3", name: "赵立民", phone: "139 8456 2910", store: "福田旗舰店", owner: "陈店长", type: "待移出", groupId: "g3", status: "待人工确认", letter: "Z" },
    { id: "c4", name: "李杰", phone: "136 7788 4501", store: "课程可见门店", owner: "课程负责人张三", type: "课程客户", groupId: "g4", status: "已同步", letter: "L" },
    { id: "c5", name: "钱韵澄", phone: "137 1209 7781", store: "南山门店", owner: "王店长", type: "黑名单", groupId: "g1", status: "自动排除", letter: "Q" },
    { id: "c6", name: "孙玉轩", phone: "135 6001 9021", store: "五一直播覆盖门店", owner: "主播小李", type: "直播客户", groupId: "g2", status: "售后跟进", letter: "S" }
  ];

  const tasks = [
    { id: "t1", groupId: "g1", title: "南山门店客户群", desc: "新增客户 20 人，移除客户 3 人，新增店员 1 人", status: "待人工确认", tone: "amber" },
    { id: "t2", groupId: "g2", title: "五一租赁专场直播群", desc: "直播覆盖门店新增 2 家，客户需补充进群", status: "分级同步", tone: "green" },
    { id: "t3", groupId: "g3", title: "福田旗舰店客户群", desc: "原群主账号停用，需要重新指定群主", status: "待处理", tone: "amber" },
    { id: "t4", groupId: "g4", title: "设备租赁使用课程群", desc: "黑名单客户已排除，低风险成员可自动同步", status: "已同步", tone: "gray" }
  ];

  const state = {
    screen: "home",
    role: "agent",
    filter: "all",
    customerFilter: "all",
    query: "",
    groupId: "g2",
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
      { groupId: "g2", from: "主播小李", role: "群主", text: "今晚直播前，麻烦各门店把预约客户问题同步一下。", mine: false },
      { groupId: "g2", from: "我", role: "代理", text: "南山门店新增客户已完成去重，待同步名单我来确认。", mine: true },
      { groupId: "g2", from: "王店长", role: "店长", text: "售后问题我这边整理了设备使用答疑文档。", mine: false }
    ]
  };

  const currentRole = () => roles.find(item => item.id === state.role) || roles[0];
  const groupById = id => groups.find(item => item.id === id) || groups[0];
  const customerById = id => customers.find(item => item.id === id) || customers[0];
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const toneFor = value => value === "待人工确认" || value === "待处理" || value.includes("分级同步") ? "amber" : value.includes("异常") || value.includes("黑名单") ? "red" : value.includes("直播") || value.includes("售中") ? "blue" : value.includes("课程") ? "violet" : value.includes("已") || value.includes("正常") || value.includes("售后") ? "green" : "gray";
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
      mine: "mine"
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
            <button class="db-top-tab ${active === "home" ? "active" : ""}" data-route="home">工作台</button>
            <button class="db-top-tab ${active === "groups" ? "active" : ""}" data-route="groups">群管理</button>
          </div>
          <button class="db-icon-btn db-right" data-action="togglePlus"><span class="db-plus"></span></button>
        </div>
        <div class="db-subtitle">${escapeHtml(role.name)}｜${escapeHtml(role.scope)}</div>
        <button class="db-search db-search-as-button" data-action="openSearch">
          <span>⌕</span><span style="color:#b5bdc5;font-size:13px;">搜索群 / 客户 / 门店 / 课程</span>
        </button>
      </div>
    `;
  }

  function bottomNav(active) {
    const items = [
      ["home", "首页", "home"],
      ["groups", "群管理", "group"],
      ["customers", "客户", "customer"],
      ["profile", "我的", "mine"]
    ];
    return `
      <nav class="db-bottom">
        ${items.map(([screen, label, iconName]) => `
          <button class="db-nav ${active === screen ? "active" : ""}" data-route="${screen}">
            ${icon(iconName)}<span>${label}</span>
          </button>
        `).join("")}
      </nav>
    `;
  }

  function plusMenu() {
    if (!state.plus) return "";
    return `
      <div class="db-pop">
        <button data-route="tasks">待处理任务</button>
        <button data-action="openSync" data-group="g1">同步成员</button>
        <button data-action="roleSheet">切换身份</button>
      </div>
    `;
  }

  function homeScreen() {
    const pendingTasks = tasks.filter(task => task.status !== "已同步").length;
    return `
      <div class="db-page">
        ${statusBar()}
        ${mainHead("home")}
        <main class="db-scroll">
          <button class="db-entry" data-route="tasks">
            ${avatar("待办", "green")}
            <span class="db-entry-main">
              <p class="db-entry-title">新的待处理</p>
              <p class="db-entry-sub">成员同步、群主异常、黑名单处理</p>
            </span>
            <span class="db-count">${pendingTasks}</span>
          </button>
          <button class="db-entry" data-route="groups">
            ${avatar("群聊", "blue")}
            <span class="db-entry-main">
              <p class="db-entry-title">我的群聊</p>
              <p class="db-entry-sub">门店群、直播群、课程群、代理协同群</p>
            </span>
          </button>

          <section class="db-section">
            <div class="db-section-title">业务概览</div>
            <div class="db-card db-soft-card">
              <div class="db-entry-meta">
                ${badge(`我的群 ${groups.length}`, "green")}
                ${badge("下级门店 28", "blue")}
                ${badge("待同步 78", "amber")}
                ${badge("直播群 6", "violet")}
              </div>
              <p class="db-entry-sub" style="margin-top:10px;">系统自动识别门店、直播、课程范围变化；低风险自动同步，高风险进入待处理。</p>
            </div>
          </section>

          <section class="db-section">
            <div class="db-section-title">常用群</div>
            ${groups.slice(0, 4).map(groupEntry).join("")}
          </section>

          <section class="db-section">
            <div class="db-section-title">业务闭环</div>
            <div class="db-info-list">
              ${infoRow("来源变化", "门店 / 直播 / 课程范围自动识别")}
              ${infoRow("分级同步", "自动同步 + 人工确认")}
              ${infoRow("群聊触达", "文字 / 照片 / 文件 / 语音")}
              ${infoRow("结果回写", "同步记录、异常状态、操作日志")}
            </div>
          </section>
        </main>
        <div class="db-alpha">A<br>B<br>C<br>D<br>F<br>H<br>K<br>M<br>N<br>S<br>Z<br>#</div>
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
        ${avatar(group.name, group.filter === "live" ? "violet" : group.filter === "course" ? "blue" : group.filter === "store" ? "green" : "gray", true)}
        <span class="db-entry-main">
          <p class="db-entry-title">${escapeHtml(group.name)}</p>
          <p class="db-entry-sub">${escapeHtml(group.type)}｜来源：${escapeHtml(group.source)}｜群主：${escapeHtml(group.owner)}</p>
          <span class="db-entry-meta">
            ${badge(`客户 ${group.customers}`)}
            ${badge(`待同步 ${group.pending}`, group.pending ? "amber" : "green")}
            ${badge(group.stage, group.filter === "live" ? "violet" : group.filter === "course" ? "blue" : "")}
          </span>
        </span>
      </button>
    `;
  }

  function groupsScreen() {
    const tabs = [["all", "全部"], ["mine", "我的群"], ["store", "门店群"], ["live", "直播群"], ["course", "课程群"]];
    const list = groups.filter(group => state.filter === "all" || group.filter === state.filter || (state.filter === "mine" && group.id === "g5"));
    return `
      <div class="db-page db-soft">
        ${statusBar()}
        ${mainHead("groups")}
        <main class="db-scroll">
          <div class="db-filter">
            ${tabs.map(([id, label]) => `<button class="${state.filter === id ? "active" : ""}" data-action="filter" data-filter="${id}">${label}</button>`).join("")}
          </div>
          <section class="db-section">
            <div class="db-section-title">${tabs.find(tab => tab[0] === state.filter)?.[1] || "全部"} ${list.length} 个</div>
            ${list.map(groupCard).join("")}
          </section>
        </main>
        ${bottomNav("groups")}
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
            <p class="db-entry-sub">${escapeHtml(group.type)}｜来源：${escapeHtml(group.source)}<br>群主：${escapeHtml(group.owner)}</p>
            <span class="db-entry-meta">
              ${badge(`客户 ${group.customers}`)}
              ${badge(`内部成员 ${group.internal}`)}
              ${badge(group.status, group.tone)}
              ${group.filter === "live" ? badge("售前｜售中｜售后", "violet") : ""}
            </span>
          </span>
        </button>
        <div class="db-actions">
          <button class="db-action" data-action="openGroup" data-group="${group.id}">群详情</button>
          <button class="db-action" data-action="openChat" data-group="${group.id}">群聊</button>
          <button class="db-action" data-action="sourceToast" data-group="${group.id}">查看来源</button>
          <button class="db-secondary" style="height:40px;font-size:13px;" data-action="openSync" data-group="${group.id}">同步成员</button>
        </div>
      </article>
    `;
  }

  function customersScreen() {
    const tabs = [["all", "全部"], ["门店客户", "门店客户"], ["直播客户", "直播客户"], ["课程客户", "课程客户"], ["待移出", "待移出"]];
    const list = customers.filter(item => state.customerFilter === "all" || item.type === state.customerFilter);
    return `
      <div class="db-page">
        ${statusBar()}
        <div class="db-head">
          <div class="db-title-row">
            <h1 class="db-title">客户通讯录</h1>
            <button class="db-icon-btn db-right" data-action="togglePlus"><span class="db-plus"></span></button>
          </div>
          <button class="db-search db-search-as-button" data-action="openSearch">
            <span>⌕</span><span style="color:#b5bdc5;font-size:13px;">搜索客户 / 手机号 / 门店</span>
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
        ${bottomNav("customers")}
        ${plusMenu()}
        ${toast()}
      </div>
    `;
  }

  function customerEntry(customer) {
    return `
      <button class="db-entry" data-action="openCustomer" data-customer="${customer.id}">
        ${avatar(customer.name, customer.type === "黑名单" ? "red" : customer.type === "直播客户" ? "violet" : customer.type === "课程客户" ? "blue" : "amber")}
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
    const groupResults = hasQuery ? groups.filter(item => [item.name, item.type, item.source, item.owner].join("").includes(q)) : [];
    const customerResults = hasQuery ? customers.filter(item => [item.name, item.phone, item.store, item.type].join("").includes(q)) : [];
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
          ${!hasQuery ? "" : empty ? emptyState("未搜索到群或客户") : `
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
              ${avatar(group.name, group.filter === "live" ? "violet" : group.filter === "course" ? "blue" : "green")}
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
              ${infoRow("客户数", `${group.customers} 位`)}
              ${infoRow("内部成员", `${group.internal} 位`)}
              ${infoRow("待同步成员", `${group.pending} 位`)}
              ${infoRow("最近同步", group.latest)}
              ${infoRow("来源对象", group.source)}
              ${infoRow("同步策略", group.pending ? "分级同步：低风险自动，高风险确认" : "已自动同步")}
            </div>
          </section>
          ${group.filter === "live" ? `
            <section class="db-section">
              <div class="db-section-title">直播服务链路</div>
              <div class="db-info-list">
                ${infoRow("售前咨询", "开播提醒、预约客户承接、商品资料预热")}
                ${infoRow("售中互动", "直播问答、商品答疑、下单问题处理")}
                ${infoRow("售后跟进", "订单跟进、设备使用指导、售后回访")}
              </div>
            </section>
          ` : ""}
          <section class="db-section">
            <div class="db-actions">
              <button class="db-primary" data-action="openSync" data-group="${group.id}">同步成员</button>
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
              ${avatar(customer.name, customer.type === "黑名单" ? "red" : "green")}
              <div>
                <h2 class="db-detail-name">${escapeHtml(customer.name)}</h2>
              <p class="db-detail-text">所属门店：${escapeHtml(customer.store)}<br>电话：${escapeHtml(customer.phone)}</p>
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
              ${infoRow("同步状态", customer.status)}
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
        ${titleHead("新的待处理", { back: true, right: `<button class="db-icon-btn db-right" data-action="openSearch" style="color:#22c7a5;font-size:13px;font-weight:800;width:auto;">搜索</button>` })}
        <main class="db-scroll no-nav">
          ${visible.length ? visible.map(task => {
            const group = groupById(task.groupId);
            const done = state.synced[group.id] || task.status === "已同步";
            return `
              <button class="db-entry" data-action="openSync" data-group="${group.id}">
                ${avatar(group.name, done ? "gray" : task.tone)}
                <span class="db-entry-main">
                  <p class="db-entry-title">${escapeHtml(task.title)}</p>
                  <p class="db-entry-sub">${escapeHtml(task.desc)}</p>
                </span>
                ${badge(done ? "已同步" : task.status, done ? "green" : task.tone)}
              </button>
            `;
          }).join("") : emptyState("暂无新的待处理")}
        </main>
        ${toast()}
      </div>
    `;
  }

  function syncScreen() {
    const group = groupById(state.groupId);
    const done = state.synced[group.id];
    return `
      <div class="db-page db-soft">
        ${statusBar()}
        ${titleHead("成员同步确认", { back: true })}
        <main class="db-scroll no-nav">
          <section class="db-detail-hero">
            <div class="db-detail-person">
              ${avatar(group.name, group.filter === "live" ? "violet" : group.filter === "course" ? "blue" : "green")}
              <div>
                <h2 class="db-detail-name">${escapeHtml(group.name)}</h2>
                <p class="db-detail-text">${escapeHtml(group.source)}<br>待同步：${group.pending} 位</p>
              </div>
            </div>
          </section>
          <section class="db-section">
            <div class="db-section-title">差异内容</div>
            <div class="db-card">
              <p class="db-entry-title" style="font-size:14px;">${escapeHtml(group.summary)}</p>
              <p class="db-entry-sub">低风险：新客户加入、重复客户去重、黑名单不加入。高风险：客户移出、客户转移、群主异常、人数阈值。</p>
              <div class="db-entry-meta">
                ${badge("自动同步 12", "green")}
                ${badge("人工确认 5", "amber")}
                ${group.filter === "live" ? badge("售前｜售中｜售后", "violet") : ""}
              </div>
            </div>
          </section>
          ${done ? `<div class="db-toast" style="position:static;transform:none;margin:14px auto 0;">已发送同步申请</div>` : ""}
          <section class="db-section">
            ${done ? `
              <button class="db-primary" style="width:100%;" data-action="openGroup" data-group="${group.id}">返回群详情</button>
              <button class="db-secondary" style="width:100%;margin-top:12px;" data-route="tasks">查看待处理</button>
            ` : `
              <button class="db-primary" style="width:100%;" data-action="confirmSync" data-group="${group.id}">确认同步</button>
              <button class="db-secondary" style="width:100%;margin-top:12px;" data-action="escalateSync">提交上级处理</button>
              <button class="db-danger" style="width:100%;margin-top:12px;" data-action="rejectSync">拒绝本次变更</button>
            `}
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
    const messages = list.length ? list : [{ groupId: group.id, from: "系统", role: "同步助手", text: `${group.name}暂无群消息，成员同步后可直接承接客户触达。`, mine: false, system: true }];
    return `
      <div class="db-page db-chat-body">
        ${statusBar()}
        ${titleHead(group.name, { back: true, more: "openSettings" })}
        <main class="db-scroll with-composer">
          <div class="db-chat-day">2026-05-09 09:41</div>
          ${group.filter === "live" ? `<div class="db-stage-bar">${badge("售前", "green")}${badge("售中", "blue")}${badge("售后", "violet")}</div>` : ""}
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
            ${toolButton("直播", "▷")}
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
              ${infoRow("查看群", "是")}
              ${infoRow("查看客户", "是")}
              ${infoRow("同步成员", role.id === "agent" ? "是" : "按角色权限")}
              ${infoRow("推送商品 / 优惠券", "V1.1 预留")}
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
            <p class="db-entry-sub" style="text-align:center;">停用后将不再进行成员同步，但保留历史聊天和同步记录。</p>
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
            <div class="db-sheet-title">切换业务身份</div>
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
      route(routeName, { reset: ["home", "groups", "customers", "profile"].includes(routeName) });
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
    if (action === "openSettings") { route("settings", { groupId: state.groupId }); return; }
    if (action === "sourceToast") { showToast("来源对象已在后台规则中自动识别"); return; }
    if (action === "roleSheet") { state.plus = false; state.sheet = "role"; render(); return; }
    if (action === "setRole") { state.role = el.dataset.role || state.role; state.sheet = null; showToast("身份已切换"); return; }
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
      showToast("已发送同步申请");
      return;
    }
    if (action === "escalateSync") { showToast("已提交上级处理"); return; }
    if (action === "rejectSync") { showToast("已拒绝本次变更"); return; }
    if (action === "sendText") {
      const input = document.getElementById("dbChatInput");
      const text = (input?.value || state.chatInput || "").trim();
      if (!text) { showToast("请输入消息内容"); return; }
      state.messages.push({ groupId: state.groupId, from: "我", role: "代理", text, mine: true });
      state.chatInput = "";
      render();
      return;
    }
    if (action === "toggleTools") { state.toolsOpen = !state.toolsOpen; render(); return; }
    if (action === "voiceMessage") {
      state.messages.push({ groupId: state.groupId, from: "我", role: "代理", text: "语音消息 12 秒", mine: true });
      render();
      return;
    }
    if (action === "toolMessage") {
      const type = el.dataset.type || "附件";
      state.messages.push({ groupId: state.groupId, from: "我", role: "代理", text: `${type}已发送`, mine: true });
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
