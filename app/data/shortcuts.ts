export interface Shortcut {
  id: string;
  key: string;
  description: string;
  context?: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const categories: Category[] = [
  { id: 'general', name: '通用控制', emoji: '⌨️', color: 'from-blue-500 to-cyan-500' },
  { id: 'text', name: '文本编辑', emoji: '✏️', color: 'from-purple-500 to-pink-500' },
  { id: 'multiline', name: '多行输入', emoji: '📝', color: 'from-green-500 to-teal-500' },
  { id: 'quick', name: '快捷命令', emoji: '⚡', color: 'from-yellow-500 to-orange-500' },
  { id: 'vim-mode', name: 'Vim 模式切换', emoji: '🔄', color: 'from-red-500 to-rose-500' },
  { id: 'vim-nav', name: 'Vim 导航', emoji: '🧭', color: 'from-indigo-500 to-violet-500' },
  { id: 'vim-edit', name: 'Vim 编辑', emoji: '🔧', color: 'from-amber-500 to-yellow-500' },
];

export const shortcuts: Shortcut[] = [
  // General controls
  { id: 'ctrl-c', key: 'Ctrl+C', description: '取消当前输入或生成', context: '标准中断信号', category: 'general' },
  { id: 'ctrl-f', key: 'Ctrl+F', description: '终止所有后台 Agent', context: '3秒内按两次确认', category: 'general' },
  { id: 'ctrl-d', key: 'Ctrl+D', description: '退出 Claude Code 会话', context: 'EOF 信号', category: 'general' },
  { id: 'ctrl-g', key: 'Ctrl+G', description: '在默认编辑器中打开', context: '编辑 prompt 或自定义响应', category: 'general' },
  { id: 'ctrl-l', key: 'Ctrl+L', description: '清除终端屏幕', context: '保留对话历史', category: 'general' },
  { id: 'ctrl-o', key: 'Ctrl+O', description: '切换详细输出模式', context: '显示工具使用和执行详情', category: 'general' },
  { id: 'ctrl-r', key: 'Ctrl+R', description: '反向搜索命令历史', context: '交互式搜索历史命令', category: 'general' },
  { id: 'ctrl-v', key: 'Ctrl+V / Cmd+V', description: '从剪贴板粘贴图片', context: '粘贴图片或图片路径', category: 'general' },
  { id: 'ctrl-b', key: 'Ctrl+B', description: '后台运行任务', context: 'Tmux 用户需按两次', category: 'general' },
  { id: 'ctrl-t', key: 'Ctrl+T', description: '切换任务列表显示', context: '在终端状态区显示/隐藏任务', category: 'general' },
  { id: 'arrows-lr', key: '← / →', description: '在对话框标签间切换', context: '导航权限对话框和菜单', category: 'general' },
  { id: 'arrows-ud', key: '↑ / ↓', description: '导航命令历史', context: '调取之前的输入', category: 'general' },
  { id: 'esc-esc', key: 'Esc + Esc', description: '回退或总结', context: '恢复到之前状态，或总结选定消息', category: 'general' },
  { id: 'shift-tab', key: 'Shift+Tab', description: '切换权限模式', context: '在自动接受/计划模式/普通模式间切换', category: 'general' },
  { id: 'opt-p', key: 'Option+P / Alt+P', description: '切换模型', context: '不清除 prompt 直接切换模型', category: 'general' },
  { id: 'opt-t', key: 'Option+T / Alt+T', description: '切换扩展思考模式', context: '需先运行 /terminal-setup', category: 'general' },

  // Text editing
  { id: 'ctrl-k', key: 'Ctrl+K', description: '删除到行尾', context: '删除的文本可粘贴', category: 'text' },
  { id: 'ctrl-u', key: 'Ctrl+U', description: '删除整行', context: '删除的文本可粘贴', category: 'text' },
  { id: 'ctrl-y', key: 'Ctrl+Y', description: '粘贴已删除的文本', context: '粘贴 Ctrl+K 或 Ctrl+U 删除的内容', category: 'text' },
  { id: 'alt-y', key: 'Alt+Y', description: '循环粘贴历史', context: '粘贴后循环切换历史删除内容（需 Option as Meta）', category: 'text' },
  { id: 'alt-b', key: 'Alt+B', description: '向前移动一个词', context: '词级导航（macOS 需配置 Option as Meta）', category: 'text' },
  { id: 'alt-f', key: 'Alt+F', description: '向后移动一个词', context: '词级导航（macOS 需配置 Option as Meta）', category: 'text' },

  // Multiline input
  { id: 'backslash-enter', key: '\\ + Enter', description: '快速换行', context: '所有终端均支持', category: 'multiline' },
  { id: 'opt-enter', key: 'Option+Enter', description: 'macOS 默认换行', context: 'macOS 默认配置', category: 'multiline' },
  { id: 'shift-enter', key: 'Shift+Enter', description: '换行（无需配置）', context: 'iTerm2, WezTerm, Ghostty, Kitty 开箱即用', category: 'multiline' },
  { id: 'ctrl-j', key: 'Ctrl+J', description: '换行符换行', context: '换行控制字符', category: 'multiline' },

  // Quick commands
  { id: 'slash', key: '/', description: '命令或 Skill', context: '在输入开头使用', category: 'quick' },
  { id: 'excl', key: '!', description: 'Bash 直接执行模式', context: '直接运行命令并将输出加入会话', category: 'quick' },
  { id: 'at', key: '@', description: '文件路径提及', context: '触发文件路径自动补全', category: 'quick' },

  // Vim mode switching
  { id: 'vim-esc', key: 'Esc', description: '进入 NORMAL 模式', context: '从 INSERT 模式切换', category: 'vim-mode' },
  { id: 'vim-i', key: 'i', description: '在光标前插入', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-shift-i', key: 'I', description: '在行首插入', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-a', key: 'a', description: '在光标后插入', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-shift-a', key: 'A', description: '在行尾插入', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-o', key: 'o', description: '在下方新建行', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-shift-o', key: 'O', description: '在上方新建行', context: 'NORMAL 模式', category: 'vim-mode' },

  // Vim navigation
  { id: 'vim-hjkl', key: 'h / j / k / l', description: '左/下/上/右移动', context: 'NORMAL 模式导航', category: 'vim-nav' },
  { id: 'vim-w', key: 'w', description: '移到下一个词', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-e', key: 'e', description: '移到词尾', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-b', key: 'b', description: '移到上一个词', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-0', key: '0', description: '移到行首', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-dollar', key: '$', description: '移到行尾', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-gg', key: 'gg', description: '移到输入开头', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-G', key: 'G', description: '移到输入末尾', context: 'NORMAL 模式', category: 'vim-nav' },

  // Vim editing
  { id: 'vim-x', key: 'x', description: '删除字符', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-dd', key: 'dd', description: '删除整行', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-D', key: 'D', description: '删除到行尾', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-cc', key: 'cc', description: '修改整行', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-yy', key: 'yy / Y', description: '复制整行', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-p', key: 'p', description: '在光标后粘贴', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-P', key: 'P', description: '在光标前粘贴', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-dot', key: '.', description: '重复上次操作', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-u', key: 'u', description: '撤销', context: 'NORMAL 模式', category: 'vim-edit' },
];
