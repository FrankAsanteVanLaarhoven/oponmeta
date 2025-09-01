import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Youtube, Link, BookOpen, ListChecks, Award, User } from 'lucide-react';
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

const CHARACTERS = [
  { name: 'Meg', style: 'business' },
  { name: 'Meg', style: 'casual' },
  { name: 'Meg', style: 'formal' },
  { name: 'Max', style: 'business' },
  { name: 'Max', style: 'casual' },
  { name: 'Max', style: 'formal' },
  { name: 'Lori', style: 'casual' },
];

const BACKGROUNDS = [
  'bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg'
];

const MULTILINGUAL_EXAMPLES = {
  en: {
    title: 'Introduction to Golf: Understanding the Game, Essential Equipment, and Basic Terminology',
    script: 'Golf is a fun sport that mixes skill, strategy, and a love for being outdoors. As a beginner, it\'s important to learn the basics...'
  },
  // ...add more languages as needed
};

const AIVideoGenerator = () => {
  const { language, setLanguage } = useAppContext();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: MULTILINGUAL_EXAMPLES[language]?.title || '',
    script: MULTILINGUAL_EXAMPLES[language]?.script || '',
    files: [],
    website: '',
    youtube: '',
    structure: {
      character: CHARACTERS[0],
      background: BACKGROUNDS[0],
      forceCompletion: false,
      autoPlay: false,
    },
    generated: null,
  });
  const [loading, setLoading] = useState(false);

  const Stepper = () => (
    <div className="flex items-center justify-center gap-8 my-8">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${i <= step ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-purple-500 border-purple-300'}`}>{i + 1}</div>
          <span className={`font-semibold ${i === step ? 'text-purple-700' : 'text-gray-500'}`}>{s.label}</span>
          {i < steps.length - 1 && <div className="w-8 h-0.5 bg-purple-200 mx-2" />}
        </div>
      ))}
    </div>
  );

  // Step 1: Describe
  const DescribeStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Describe your video</h2>
        <Select value={language} onChange={e => setLanguage(e.target.value)}>
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </Select>
      </div>
      <Input placeholder="Video Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      <Textarea placeholder="Video Script" value={form.script} onChange={e => setForm(f => ({ ...f, script: e.target.value }))} />
      <div className="flex justify-end gap-2">
        <Button onClick={() => setStep(1)} disabled={!form.title || !form.script}>Next</Button>
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
      <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-purple-50">
        <Upload className="w-12 h-12 text-purple-400 mb-2" />
        <input type="file" multiple className="hidden" id="file-upload" onChange={e => setForm(f => ({ ...f, files: [...f.files, ...Array.from(e.target.files || [])] }))} />
        <label htmlFor="file-upload" className="text-purple-600 cursor-pointer">Drag & Drop to upload<br />or <span className="underline">Browse to upload</span></label>
        <div className="text-xs text-gray-500 mt-2">Supported File Types: .pdf, .txt, .docx, .csv</div>
        {form.files.length > 0 && <div className="mt-4 w-full"><b>Files:</b> {form.files.map((f: any) => f.name).join(', ')}</div>}
      </div>
      <Input placeholder="Paste website URL" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
      <Input placeholder="Paste Youtube URL" value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} />
      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
        <Button onClick={() => setStep(2)}>Next</Button>
      </div>
    </div>
  );

  // Step 3: Structure
  const StructureStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Video Structure</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Character</label>
          <div className="flex gap-2 flex-wrap">
            {CHARACTERS.map((c, i) => (
              <Button key={i} variant={form.structure.character === c ? 'default' : 'outline'} onClick={() => setForm(f => ({ ...f, structure: { ...f.structure, character: c } }))} className="flex flex-col items-center">
                <User className="mb-1" />
                <span>{c.name}</span>
                <span className="text-xs text-gray-500">{c.style}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Background</label>
          <div className="flex gap-2 flex-wrap">
            {BACKGROUNDS.map((bg, i) => (
              <Button key={i} variant={form.structure.background === bg ? 'default' : 'outline'} onClick={() => setForm(f => ({ ...f, structure: { ...f.structure, background: bg } }))} className="w-24 h-12">
                <span>{bg}</span>
              </Button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={form.structure.forceCompletion} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, forceCompletion: e.target.checked } }))} /> Force Completion
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" checked={form.structure.autoPlay} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, autoPlay: e.target.checked } }))} /> Auto play
        </label>
      </div>
      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={() => setStep(3)}>Next</Button>
      </div>
    </div>
  );

  // Step 4: Generate & Review
  const GenerateStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Generate & Review</h2>
      <div className="flex flex-col gap-4">
        <Button onClick={async () => {
          setLoading(true);
          setTimeout(() => {
            setForm(f => ({ ...f, generated: { ...f, ai: true } }));
            setLoading(false);
          }, 2000);
        }} disabled={loading}>{loading ? 'Generating...' : 'Generate Video with AI'}</Button>
        {form.generated && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold mb-2">AI-Generated Video Preview</h3>
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-2">[Video Preview Placeholder]</div>
            <Button className="mt-2">Export (MP4, etc.)</Button>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
        <Button onClick={() => alert('Video saved!')}>Finish</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a1834] py-8">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto p-8">
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

export default AIVideoGenerator; 