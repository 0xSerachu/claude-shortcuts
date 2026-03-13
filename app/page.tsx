'use client';

import { useState, useEffect, useCallback } from 'react';
import { shortcuts, categories, type Shortcut } from './data/shortcuts';

type Mode = 'browse' | 'quiz';
type QuizState = 'question' | 'result';

function KeyBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 flex-wrap">
      {text.split(' / ').map((part, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-gray-500 text-xs">or</span>}
          {part.split('+').map((k, j) => (
            <span key={j} className="inline-flex items-center gap-0.5">
              {j > 0 && <span className="text-gray-400 text-xs">+</span>}
              <kbd className="px-2 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs font-mono text-green-400 shadow-sm">
                {k.trim()}
              </kbd>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function ShortcutCard({ shortcut, revealed, onClick }: {
  shortcut: Shortcut;
  revealed: boolean;
  onClick: () => void;
}) {
  const cat = categories.find(c => c.id === shortcut.category);

  return (
    <div className="cursor-pointer group" onClick={onClick}>
      <div className={`relative rounded-xl border transition-all duration-200 overflow-hidden
        ${revealed
          ? 'border-green-500/50 bg-gray-900/80 shadow-lg shadow-green-500/10'
          : 'border-gray-700/50 bg-gray-900/60 hover:border-gray-600 hover:bg-gray-900/80'
        }`}
      >
        <div className={`h-0.5 bg-gradient-to-r ${cat?.color || 'from-gray-500 to-gray-600'}`} />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {revealed ? (
                <>
                  <div className="mb-2">
                    <KeyBadge text={shortcut.key} />
                  </div>
                  <p className="text-white text-sm font-medium">{shortcut.description}</p>
                  {shortcut.context && (
                    <p className="text-gray-500 text-xs mt-1">{shortcut.context}</p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-white text-sm font-medium">{shortcut.description}</p>
                  {shortcut.context && (
                    <p className="text-gray-500 text-xs mt-1">{shortcut.context}</p>
                  )}
                  <p className="text-gray-600 text-xs mt-2 group-hover:text-gray-500 transition-colors">
                    点击查看快捷键 →
                  </p>
                </>
              )}
            </div>
            <span className="text-lg flex-shrink-0">{cat?.emoji}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizMode() {
  const [quizShortcuts, setQuizShortcuts] = useState<Shortcut[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>('question');
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const initQuiz = useCallback(() => {
    const pool = selectedCategory === 'all'
      ? shortcuts
      : shortcuts.filter(s => s.category === selectedCategory);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizShortcuts(shuffled);
    setCurrent(0);
    setScore(0);
    setQuizState('question');
    setSelected(null);
    setFinished(false);
  }, [selectedCategory]);

  useEffect(() => { initQuiz(); }, [initQuiz]);

  useEffect(() => {
    if (quizShortcuts.length === 0) return;
    const correct = quizShortcuts[current];
    const others = shortcuts
      .filter(s => s.id !== correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(s => s.key);
    const opts = [...others, correct.key].sort(() => Math.random() - 0.5);
    setOptions(opts);
    setSelected(null);
    setQuizState('question');
  }, [current, quizShortcuts]);

  if (quizShortcuts.length === 0) return null;

  const q = quizShortcuts[current];

  const handleAnswer = (opt: string) => {
    if (quizState !== 'question') return;
    setSelected(opt);
    setQuizState('result');
    if (opt === q.key) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= quizShortcuts.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
    }
  };

  if (finished) {
    const pct = Math.round((score / quizShortcuts.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6">
        <div className="text-6xl mb-2">
          {pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}
        </div>
        <h2 className="text-3xl font-bold text-white">测验完成！</h2>
        <div className="text-center">
          <div className="text-5xl font-bold text-green-400">{score}/{quizShortcuts.length}</div>
          <div className="text-gray-400 mt-1">正确率 {pct}%</div>
        </div>
        <div className={`text-lg font-medium ${pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          {pct >= 80 ? '太棒了！你已经掌握这些快捷键了！' : pct >= 60 ? '不错！继续练习会更好！' : '继续加油，熟能生巧！'}
        </div>
        <button
          onClick={initQuiz}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold rounded-xl hover:opacity-90 transition-all"
        >
          再来一次
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
        >
          全部
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat.id ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>第 {current + 1} / {quizShortcuts.length} 题</span>
          <span className="text-green-400">得分: {score}</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${(current / quizShortcuts.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-6 mb-6">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
          {categories.find(c => c.id === q.category)?.emoji} {categories.find(c => c.id === q.category)?.name}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{q.description}</h3>
        {q.context && <p className="text-gray-500 text-sm">{q.context}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((opt) => {
          let style = 'border-gray-700/50 bg-gray-900/60 hover:border-gray-600 text-gray-300 hover:text-white';
          if (quizState === 'result') {
            if (opt === q.key) {
              style = 'border-green-500 bg-green-500/10 text-green-400';
            } else if (opt === selected) {
              style = 'border-red-500 bg-red-500/10 text-red-400';
            } else {
              style = 'border-gray-800 bg-gray-900/30 text-gray-600';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={quizState === 'result'}
              className={`p-4 rounded-xl border text-left transition-all duration-200 font-mono text-sm ${style}`}
            >
              <KeyBadge text={opt} />
            </button>
          );
        })}
      </div>

      {quizState === 'result' && (
        <div className="mt-4">
          <div className={`p-3 rounded-xl text-sm mb-4 ${selected === q.key ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
            {selected === q.key ? '✓ 正确！' : `✗ 正确答案是: ${q.key}`}
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold rounded-xl hover:opacity-90 transition-all"
          >
            {current + 1 >= quizShortcuts.length ? '查看结果' : '下一题 →'}
          </button>
        </div>
      )}
    </div>
  );
}

function BrowseMode() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const filtered = shortcuts.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = !search ||
      s.key.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleReveal = (id: string) => {
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const revealAll = () => setRevealed(new Set(filtered.map(s => s.id)));
  const hideAll = () => setRevealed(new Set());

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="搜索快捷键或描述..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 text-sm"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
        >
          全部 ({shortcuts.length})
        </button>
        {categories.map(cat => {
          const count = shortcuts.filter(s => s.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              {cat.emoji} {cat.name} ({count})
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">
          {filtered.length} 个快捷键 · 点击卡片显示答案
        </span>
        <div className="flex gap-2">
          <button onClick={revealAll} className="text-xs text-gray-500 hover:text-green-400 transition-colors">全部显示</button>
          <span className="text-gray-700">·</span>
          <button onClick={hideAll} className="text-xs text-gray-500 hover:text-green-400 transition-colors">全部隐藏</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(s => (
          <ShortcutCard
            key={s.id}
            shortcut={s}
            revealed={revealed.has(s.id)}
            onClick={() => toggleReveal(s.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          没有找到匹配的快捷键
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<Mode>('browse');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Claude Code 互动教学
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              快捷键速成指南
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            掌握 Claude Code 的所有快捷键，提升编码效率
          </p>
          <p className="text-gray-600 text-sm mt-2">
            {shortcuts.length} 个快捷键 · {categories.length} 个分类
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-900 border border-gray-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setMode('browse')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'browse' ? 'bg-green-500 text-black' : 'text-gray-400 hover:text-white'}`}
            >
              📖 浏览学习
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'quiz' ? 'bg-green-500 text-black' : 'text-gray-400 hover:text-white'}`}
            >
              🎯 测验挑战
            </button>
          </div>
        </div>

        {mode === 'browse' ? <BrowseMode /> : <QuizMode />}

        <div className="mt-16 text-center text-gray-700 text-sm">
          <p>
            基于{' '}
            <a
              href="https://code.claude.com/docs/en/interactive-mode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-400 transition-colors"
            >
              Claude Code 官方文档
            </a>{' '}
            构建
          </p>
        </div>
      </div>
    </div>
  );
}
