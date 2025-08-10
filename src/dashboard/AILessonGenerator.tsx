import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Youtube, Link, BookOpen, ListChecks, Award } from 'lucide-react';
import { Select } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const steps = [
  { label: 'Describe', icon: BookOpen },
  { label: 'Train AI', icon: Upload },
  { label: 'Structure', icon: ListChecks },
  { label: 'Generate & Review', icon: Award },
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
];

const MULTILINGUAL_EXAMPLES = {
  en: {
    title: 'Introduction to Project Management',
    description: 'This lesson introduces the fundamentals of project management, including roles, goals, and essential skills.',
    objectives: [
      'Define project management',
      'Identify key roles in a project',
      'Understand project goals and deliverables',
    ],
  },
  // ...add more languages as needed
};

const AILessonGenerator = () => {
  const { language, setLanguage } = useAppContext();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: MULTILINGUAL_EXAMPLES[language]?.title || '',
    description: MULTILINGUAL_EXAMPLES[language]?.description || '',
    objectives: MULTILINGUAL_EXAMPLES[language]?.objectives || [''],
    files: [],
    website: '',
    youtube: '',
    structure: {
      topics: 3,
      subtopicsPerTopic: 2,
      includeQuiz: true,
      includeAssignment: false,
    },
    outline: [],
    generated: null,
  });
  const [loading, setLoading] = useState(false);

  const Stepper = () => (
    <div className="flex items-center justify-center gap-8 my-8">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${i <= step ? 'bg-cyan-300 text-[#0a1834] border-cyan-300' : 'bg-[#22305a] text-cyan-300 border-[#22305a]'}`}>{i + 1}</div>
          <span className={`font-semibold ${i === step ? 'text-cyan-300' : 'text-[#22305a]'}`}>{s.label}</span>
          {i < steps.length - 1 && <div className="w-8 h-0.5 bg-cyan-300/30 mx-2" />}
        </div>
      ))}
    </div>
  );

  // Step 1: Describe
  const DescribeStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Describe your lesson</h2>
        <Select value={language} onChange={e => setLanguage(e.target.value)}>
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </Select>
      </div>
      <Input placeholder="Lesson Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      <Textarea placeholder="Lesson Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      <Textarea placeholder="Lesson Objectives (one per line)" value={form.objectives.join('\n')} onChange={e => setForm(f => ({ ...f, objectives: e.target.value.split('\n') }))} />
      <div className="flex justify-end gap-2">
        <Button className="bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]" onClick={() => setStep(1)} disabled={!form.title || !form.description}>Next</Button>
      </div>
    </div>
  );

  // Step 2: Train AI
  const TrainAIStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Optional: Train AI on existing content</h2>
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1"><FileText className="mr-2" /> Files</Button>
        <Button variant="outline" className="flex-1"><Link className="mr-2" /> Websites</Button>
        <Button variant="outline" className="flex-1"><Youtube className="mr-2" /> Youtube</Button>
      </div>
      <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-[#22305a]">
        <Upload className="w-12 h-12 text-cyan-300 mb-2" />
        <input type="file" multiple className="hidden" id="file-upload" onChange={e => setForm(f => ({ ...f, files: [...f.files, ...Array.from(e.target.files || [])] }))} />
        <label htmlFor="file-upload" className="text-cyan-300 cursor-pointer">Drag & Drop to upload<br />or <span className="underline">Browse to upload</span></label>
        <div className="text-xs text-cyan-300/70 mt-2">Supported File Types: .pdf, .txt, .docx, .csv</div>
        {form.files.length > 0 && <div className="mt-4 w-full"><b>Files:</b> {form.files.map((f: any) => f.name).join(', ')}</div>}
      </div>
      <Input placeholder="Paste website URL" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
      <Input placeholder="Paste Youtube URL" value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} />
      <div className="flex justify-between gap-2">
        <Button variant="outline" className="border-[#11204a] text-cyan-300 hover:bg-[#11204a]/10" onClick={() => setStep(0)}>Back</Button>
        <Button className="bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]" onClick={() => setStep(2)}>Next</Button>
      </div>
    </div>
  );

  // Step 3: Structure
  const StructureStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Lesson Structure</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input type="number" min={1} max={10} value={form.structure.topics} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, topics: +e.target.value } }))} placeholder="Topics" />
        <Input type="number" min={1} max={10} value={form.structure.subtopicsPerTopic} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, subtopicsPerTopic: +e.target.value } }))} placeholder="Subtopics/Topic" />
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={form.structure.includeQuiz} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, includeQuiz: e.target.checked } }))} /> Include Quiz
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={form.structure.includeAssignment} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, includeAssignment: e.target.checked } }))} /> Include Assignment
        </label>
      </div>
      <div className="flex justify-between gap-2">
        <Button variant="outline" className="border-[#11204a] text-cyan-300 hover:bg-[#11204a]/10" onClick={() => setStep(1)}>Back</Button>
        <Button className="bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]" onClick={() => setStep(3)}>Next</Button>
      </div>
    </div>
  );

  // Step 4: Generate & Review
  const GenerateStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Generate & Review</h2>
      <div className="flex flex-col gap-4">
        <Button className="bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]" onClick={async () => {
          setLoading(true);
          setTimeout(() => {
            setForm(f => ({ ...f, generated: { ...f, ai: true } }));
            setLoading(false);
          }, 2000);
        }} disabled={loading}>{loading ? 'Generating...' : 'Generate Lesson with AI'}</Button>
        {form.generated && (
          <div className="border rounded-lg p-4 bg-[#22305a] text-white">
            <h3 className="font-bold mb-2">AI-Generated Lesson Preview</h3>
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(form.generated, null, 2)}</pre>
            <Button className="mt-2 bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]">Export (PDF, etc.)</Button>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2">
        <Button variant="outline" className="border-[#11204a] text-cyan-300 hover:bg-[#11204a]/10" onClick={() => setStep(2)}>Back</Button>
        <Button className="bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]" onClick={() => alert('Lesson saved!')}>Finish</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a1834] py-8">
      <div className="bg-[#16203a] border-2 border-[#11204a] rounded-xl shadow-lg max-w-4xl mx-auto p-8 text-white">
        <DashboardBackButton />
        <Stepper />
        {step === 0 && <DescribeStep />}
        {step === 1 && <TrainAIStep />}
        {step === 2 && <StructureStep />}
        {step === 3 && <GenerateStep />}
      </div>
    </div>
  );
};

export default AILessonGenerator; 