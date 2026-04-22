-- Surepass IQ - starter seed for learner features
-- Run after scripts/supabase/schema.sql and scripts/supabase/002_learning_features.sql

insert into public.course_categories (slug, name, description, icon)
values
  ('ai-data', 'AI & Data', 'Practical AI, prompt engineering, and data literacy courses.', 'AI'),
  ('business', 'Business', 'Operations, strategy, and communication skills for teams.', 'Biz'),
  ('design', 'Design', 'User experience, interface thinking, and product design foundations.', 'UX'),
  ('marketing', 'Marketing', 'Digital marketing and content strategy programs.', 'Mkt'),
  ('it-software', 'IT & Software', 'Security, IT awareness, and software-adjacent learning.', 'IT'),
  ('personal-development', 'Personal Development', 'Leadership, communication, and growth skills.', 'Grow')
on conflict (slug) do update
  set name = excluded.name,
      description = excluded.description,
      icon = excluded.icon;

insert into public.courses (
  slug,
  title,
  description,
  duration_hours,
  level,
  category_slug,
  subcategory,
  last_updated_label,
  skills,
  target_audience,
  learning_outcomes,
  requirements
)
values
  (
    'ai-foundations-everyday-work',
    'AI Foundations for Everyday Work',
    'Build confidence with AI terminology, prompting, and responsible workplace use.',
    8,
    'beginner',
    'ai-data',
    'AI Fundamentals',
    'April 2026',
    '["Prompt writing","Responsible AI use","Workflow design"]'::jsonb,
    '["Professionals new to AI","Students","Team adoption leads"]'::jsonb,
    '["Explain core AI concepts","Write stronger prompts","Adopt safe AI habits"]'::jsonb,
    '["No prior AI experience","Internet access"]'::jsonb
  ),
  (
    'prompt-engineering-for-teams',
    'Prompt Engineering for Teams',
    'Create reusable prompts and prompt libraries for support, reporting, and operations.',
    7,
    'intermediate',
    'ai-data',
    'Prompt Engineering',
    'April 2026',
    '["Prompt systems","Workflow standardisation","AI governance"]'::jsonb,
    '["Team leads","Operations managers","Knowledge workers"]'::jsonb,
    '["Standardise team prompts","Review output quality","Document prompt ownership"]'::jsonb,
    '["Familiarity with an AI chat tool"]'::jsonb
  ),
  (
    'data-analysis-excel-power-bi',
    'Data Analysis with Excel and Power BI',
    'Clean business data, analyse trends, and build decision-ready dashboards.',
    12,
    'beginner',
    'ai-data',
    'Data Literacy',
    'March 2026',
    '["Excel analysis","Power BI","Dashboard design"]'::jsonb,
    '["Analysts","Operations staff","Students"]'::jsonb,
    '["Clean datasets","Build dashboards","Present business insights"]'::jsonb,
    '["Excel installed"]'::jsonb
  ),
  (
    'ai-workflow-automation-operations',
    'AI Workflow Automation for Operations',
    'Map repetitive work, handle exceptions, and launch safer automation pilots.',
    9,
    'intermediate',
    'business',
    'Operations',
    'April 2026',
    '["Process mapping","Automation planning","Change management"]'::jsonb,
    '["Operations coordinators","Team leads","Process improvement staff"]'::jsonb,
    '["Select automation candidates","Design exception handling","Measure rollout impact"]'::jsonb,
    '["Basic familiarity with operations workflows"]'::jsonb
  )
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      duration_hours = excluded.duration_hours,
      level = excluded.level,
      category_slug = excluded.category_slug,
      subcategory = excluded.subcategory,
      last_updated_label = excluded.last_updated_label,
      skills = excluded.skills,
      target_audience = excluded.target_audience,
      learning_outcomes = excluded.learning_outcomes,
      requirements = excluded.requirements;
