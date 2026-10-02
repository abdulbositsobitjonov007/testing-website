import { useEffect, useMemo, useState } from "react";
import { SECTIONS } from "./data";
import { draw, PICK } from "./pool";
import { T, RUM } from "./i18n";

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT = import.meta.env.VITE_TG_CHAT_ID;
const PER_Q = 120; // har bir savolga 2 daqiqa
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const L = ["A", "B", "C", "D"];

const Card = ({ children, className = "" }) => <div className={`rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl ${className}`}>{children}</div>;
const Btn = ({ children, className = "", ...p }) => <button {...p} className={`rounded-2xl px-6 py-3 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-cyan-300 ${className}`}>{children}</button>;
const Primary = "bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 hover:brightness-110";
const Ghost = "border border-white/15 bg-white/5 hover:bg-white/10";
const Input = "rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base outline-none focus:border-cyan-300";

export default function App() {
  const [lang, setLang] = useState("uz");
  const [screen, setScreen] = useState("home");
  const [picked, setPicked] = useState([]);
  const [qs, setQs] = useState([]);
  const [ans, setAns] = useState({});
  const [cur, setCur] = useState(0);
  const [endAt, setEndAt] = useState(0);
  const [left, setLeft] = useState(0);
  const [form, setForm] = useState({ name: "", surname: "", levels: {} });
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const t = T[lang];
  const sm = (s) => (lang === "ru" ? { ...s, title: RUM[s.id][0], desc: RUM[s.id][1] } : s);

  const chosen = SECTIONS.filter((s) => picked.includes(s.id)).map(sm);
  const total = chosen.length * PICK;
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const start = () => {
    const list = draw(SECTIONS.filter((s) => picked.includes(s.id)).map((s) => s.id));
    setQs(list); setAns({}); setCur(0); setErr("");
    setEndAt(Date.now() + list.length * PER_Q * 1000);
    setLeft(list.length * PER_Q);
    setScreen("quiz");
  };

  useEffect(() => {
    if (screen !== "quiz") return;
    const i = setInterval(() => {
      const l = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) setScreen("form");
    }, 1000);
    return () => clearInterval(i);
  }, [screen, endAt]);

  const stats = useMemo(() => {
    const by = {};
    qs.forEach((x, i) => { by[x.sec] ??= { c: 0, n: 0 }; by[x.sec].n++; if (ans[i] === x.a) by[x.sec].c++; });
    return by;
  }, [qs, ans]);
  const score = Object.values(stats).reduce((a, s) => a + s.c, 0);
  const pct = qs.length ? Math.round((score / qs.length) * 100) : 0;
  const lv = (id) => form.levels[id] ?? 0;

  const send = async () => {
    setSending(true); setErr("");
    const lines = SECTIONS.filter((s) => stats[s.id]).map((s) => `• ${sm(s).title}: ${stats[s.id].c}/${stats[s.id].n} (${t.tg[1]}: ${t.levels[lv(s.id)]})`);
    const text = [t.tg[0], `👤 ${form.name.trim()} ${form.surname.trim()}`, "", ...lines, "", `✅ ${t.tg[2]}: ${score}/${qs.length} (${pct}%)`, `⏱ ${t.tg[3]}: ${fmt(qs.length * PER_Q - left)}`].join("\n");
    try {
      const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: CHAT, text }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.description || "error");
      setScreen("result");
    } catch (e) { setErr(t.err(e.message)); }
    setSending(false);
  };

  const reset = () => { setScreen("home"); setPicked([]); setForm({ name: "", surname: "", levels: {} }); };
  const valid = form.name.trim().length > 1 && form.surname.trim().length > 1;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,#1e2a78_0%,transparent_45%),radial-gradient(ellipse_at_bottom_right,#0e5a6b_0%,transparent_40%)]">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-14">
        <div className="mb-6 flex justify-end gap-1 rounded-2xl">
          {["uz", "ru"].map((l) => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-xl px-4 py-2 text-sm font-bold ${lang === l ? "bg-cyan-300 text-slate-950" : "bg-white/10 hover:bg-white/15"}`}>{l === "uz" ? "O'zbekcha" : "Русский"}</button>
          ))}
        </div>

        {screen === "home" && (
          <>
            <header className="mb-10 max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">{t.title}</h1>
              <p className="mt-4 text-lg text-slate-300">{t.sub}</p>
            </header>
            <div className="mb-6 flex gap-3">
              <Btn className={Ghost} onClick={() => setPicked(SECTIONS.map((s) => s.id))}>{t.all}</Btn>
              <Btn className={Ghost} onClick={() => setPicked([])}>{t.clear}</Btn>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SECTIONS.map(sm).map((s) => {
                const on = picked.includes(s.id);
                return (
                  <button key={s.id} onClick={() => toggle(s.id)} aria-pressed={on} className={`relative overflow-hidden rounded-3xl border p-6 text-left transition ${on ? "border-cyan-300 bg-white/10" : "border-white/10 bg-white/4 hover:bg-white/8"}`}>
                    <div className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br text-2xl ${s.grad}`}>
                      {s.icon}
                    </div>
                    <div className="text-xl font-bold">{s.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{s.desc}</div>
                    <div className="mt-4 text-sm font-semibold text-slate-200">{t.info(PICK)}</div>
                    <span className={`absolute right-5 top-5 grid h-7 w-7 place-items-center rounded-full border text-sm ${on ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/20"}`}>{on && "✓"}</span>
                  </button>
                );
              })}
            </div>
            <Card className="sticky bottom-4 mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <div className="text-lg font-bold">{t.info(total)}</div>
                <div className="text-sm text-slate-400">{chosen.length ? chosen.map((s) => s.title).join(", ") : t.empty}</div>
              </div>
              <Btn className={Primary} disabled={!total} onClick={start}>{t.start}</Btn>
            </Card>
          </>
        )}

        {screen === "quiz" && qs[cur] && (() => {
          const q = qs[cur];
          const sec = sm(SECTIONS.find((s) => s.id === q.sec));
          return (
            <>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="text-sm text-slate-300">{sec.icon} {sec.title} · {t.q} {cur + 1}/{qs.length}</div>
                <div className={`rounded-2xl px-4 py-2 font-mono text-xl font-bold ${left < 60 ? "bg-rose-500/20 text-rose-300" : "bg-white/10"}`}>⏱ {fmt(left)}</div>
              </div>
              <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-linear-to-r from-indigo-500 to-cyan-400 transition-all" style={{ width: `${(Object.keys(ans).length / qs.length) * 100}%` }} />
              </div>
              <Card className="p-6 sm:p-10">
                <h2 className="text-2xl font-bold leading-snug sm:text-3xl">{q.q[lang]}</h2>
                <div className="mt-8 grid gap-3">
                  {q.o.map((o, i) => (
                    <button key={i} onClick={() => setAns({ ...ans, [cur]: i })} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${ans[cur] === i ? "border-cyan-300 bg-cyan-300/15" : "border-white/10 bg-white/3 hover:bg-white/8"}`}>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl font-bold ${ans[cur] === i ? "bg-cyan-300 text-slate-950" : "bg-white/10"}`}>{L[i]}</span>
                      <span className="text-[15px] sm:text-base">{o[lang]}</span>
                    </button>
                  ))}
                </div>
              </Card>
              <div className="mt-6 flex flex-wrap justify-between gap-3">
                <Btn className={Ghost} disabled={cur === 0} onClick={() => setCur(cur - 1)}>{t.prev}</Btn>
                {cur < qs.length - 1 ? <Btn className={Primary} onClick={() => setCur(cur + 1)}>{t.next}</Btn> : <Btn className={Primary} onClick={() => setScreen("form")}>{t.finish}</Btn>}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {qs.map((_, i) => <button key={i} onClick={() => setCur(i)} aria-label={`${t.q} ${i + 1}`} className={`h-9 w-9 rounded-xl text-sm font-bold ${i === cur ? "bg-cyan-300 text-slate-950" : ans[i] !== undefined ? "bg-indigo-500/60" : "bg-white/10"}`}>{i + 1}</button>)}
              </div>
              <div className="mt-6 text-center"><Btn className="text-slate-400 hover:text-white" onClick={() => setScreen("form")}>{t.early}</Btn></div>
            </>
          );
        })()}

        {screen === "form" && (
          <Card className="mx-auto max-w-xl p-6 sm:p-10">
            <h2 className="text-3xl font-extrabold">{t.done}</h2>
            <p className="mt-2 text-slate-300">{t.doneSub(Object.keys(ans).length, qs.length)}</p>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-1.5 text-sm font-semibold">{t.fn}<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={Input} placeholder={t.fnp} /></label>
              <label className="grid gap-1.5 text-sm font-semibold">{t.ln}<input value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} className={Input} placeholder={t.lnp} /></label>
              <div className="grid gap-3">
                <div className="text-sm font-semibold">{t.lvl}</div>
                {[...new Set(qs.map((x) => x.sec))].map((id) => {
                  const s = sm(SECTIONS.find((x) => x.id === id)); return (
                    <div key={id} className="flex items-center justify-between gap-3 rounded-xl bg-white/5 p-3">
                      <span className="font-semibold">{s.icon} {s.title}</span>
                      <select value={lv(id)} onChange={(e) => setForm({ ...form, levels: { ...form.levels, [id]: +e.target.value } })} className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2">
                        {t.levels.map((l, i) => <option key={i} value={i}>{l}</option>)}
                      </select>
                    </div>);
                })}
              </div>
            </div>
            {err && <p role="alert" className="mt-4 rounded-xl bg-rose-500/15 p-3 text-sm text-rose-200">{err}</p>}
            <Btn className={`${Primary} mt-6 w-full`} disabled={!valid || sending} onClick={send}>{sending ? t.sending : err ? t.retry : t.send}</Btn>
          </Card>
        )}

        {screen === "result" && (
          <>
            <Card className="mb-6 p-8 text-center">
              <div className="text-slate-300">{t.sent(form.name)}</div>
              <div className="mt-2 text-7xl font-extrabold">{pct}%</div>
              <div className="mt-1 text-lg text-slate-300">{t.correct(score, qs.length)}</div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SECTIONS.filter((s) => stats[s.id]).map(sm).map((s) => (
                  <div key={s.id} className="rounded-2xl bg-white/5 p-4 text-left">
                    <div className="flex justify-between font-semibold"><span>{s.icon} {s.title}</span><span>{stats[s.id].c}/{stats[s.id].n}</span></div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full bg-linear-to-r ${s.grad}`} style={{ width: `${(stats[s.id].c / stats[s.id].n) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
            </Card>
            <h3 className="mb-4 text-2xl font-bold">{t.review}</h3>
            <div className="grid gap-4">
              {qs.map((x, i) => ans[i] === x.a ? null : (
                <Card key={i} className="p-5">
                  <div className="text-xs text-slate-400">{sm(SECTIONS.find((s) => s.id === x.sec)).title} · {t.q} {i + 1}</div>
                  <div className="mt-1 font-bold">{x.q[lang]}</div>
                  <div className="mt-3 grid gap-2 text-sm">
                    <div className="rounded-xl bg-rose-500/15 p-3 text-rose-200">{t.yours}{ans[i] === undefined ? t.none : x.o[ans[i]][lang]}</div>
                    <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-200">{t.right}{x.o[x.a][lang]}</div>
                  </div>
                </Card>
              ))}
              {score === qs.length && <Card className="p-6 text-center text-lg font-bold">{t.perfect}</Card>}
            </div>
            <div className="mt-8 text-center"><Btn className={Primary} onClick={reset}>{t.again}</Btn></div>
          </>
        )}
      </main>
    </div>
  );
}
