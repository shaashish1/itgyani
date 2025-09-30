-- Create topics table for batch blog generation
CREATE TABLE IF NOT EXISTS public.blog_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  keywords TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.blog_topics ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can manage blog topics
CREATE POLICY "Admins can manage blog topics"
ON public.blog_topics
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::user_role))
WITH CHECK (has_role(auth.uid(), 'admin'::user_role));

-- Insert 50 AI-related topics across all categories
INSERT INTO public.blog_topics (topic, category_id, keywords) VALUES
-- Technology Category Topics (15)
('The Rise of Generative AI: GPT-5 and Beyond in 2025', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['GPT-5', 'Generative AI', 'Large Language Models', 'AI Evolution']),
('Quantum Computing Meets AI: The Next Frontier', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Quantum Computing', 'AI Integration', 'Future Tech', 'Innovation']),
('Edge AI: Bringing Intelligence to IoT Devices', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Edge Computing', 'IoT', 'AI Deployment', 'Real-time Processing']),
('Multimodal AI: Understanding Text, Image, and Video Together', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Multimodal AI', 'Computer Vision', 'NLP', 'AI Integration']),
('AI Chip Wars: NVIDIA, Google, and the Future of AI Hardware', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['AI Hardware', 'GPUs', 'TPUs', 'Technology Competition']),
('Neuromorphic Computing: Building Brain-Like AI Systems', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Neuromorphic', 'Neural Networks', 'Bio-inspired AI', 'Computing']),
('Federated Learning: Training AI Without Compromising Privacy', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Federated Learning', 'Privacy', 'Distributed AI', 'Security']),
('AutoML Revolution: Democratizing Machine Learning for Everyone', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['AutoML', 'No-Code AI', 'Democratization', 'Accessibility']),
('AI-Powered Cybersecurity: Fighting Threats with Intelligence', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Cybersecurity', 'AI Security', 'Threat Detection', 'Defense']),
('Natural Language Processing Breakthroughs in 2025', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['NLP', 'Language Models', 'Conversational AI', 'Understanding']),
('Computer Vision 3.0: Real-World AI Applications', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Computer Vision', 'Image Recognition', 'Visual AI', 'Applications']),
('AI in Cloud Computing: Scaling Intelligence Globally', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Cloud AI', 'Scalability', 'Infrastructure', 'Global Deployment']),
('Reinforcement Learning: Teaching AI Through Trial and Error', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Reinforcement Learning', 'AI Training', 'Game Theory', 'Optimization']),
('Transfer Learning: Making AI Smarter with Less Data', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['Transfer Learning', 'Efficiency', 'Pre-trained Models', 'AI Optimization']),
('Explainable AI: Making Black Box Models Transparent', (SELECT id FROM categories WHERE slug = 'technology'), ARRAY['XAI', 'Transparency', 'Interpretability', 'Trust']),

-- Business Category Topics (15)
('AI-Driven Business Strategy: Competitive Advantage in 2025', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['Business Strategy', 'Competitive Advantage', 'AI Adoption', 'Growth']),
('ROI of AI: Measuring Real Business Impact', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['ROI', 'Business Metrics', 'AI Value', 'Performance']),
('AI in Supply Chain: Optimizing Global Operations', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['Supply Chain', 'Logistics', 'Optimization', 'Efficiency']),
('Customer Experience Revolution with AI Personalization', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['CX', 'Personalization', 'Customer Journey', 'Engagement']),
('AI-Powered Sales: Predictive Analytics and Lead Scoring', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['Sales AI', 'Predictive Analytics', 'Lead Generation', 'Conversion']),
('Financial Forecasting with AI: Reducing Risk and Uncertainty', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['Financial AI', 'Forecasting', 'Risk Management', 'Prediction']),
('HR Transformation: AI in Recruitment and Talent Management', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['HR AI', 'Recruitment', 'Talent Management', 'Workforce']),
('Marketing Automation 2.0: AI-Driven Campaign Optimization', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['Marketing AI', 'Automation', 'Campaign Optimization', 'Growth']),
('AI Ethics in Business: Building Responsible Practices', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['AI Ethics', 'Responsibility', 'Governance', 'Compliance']),
('Small Business AI: Affordable Tools for Growth', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['SMB AI', 'Affordable Tools', 'Growth Hacks', 'Accessibility']),
('AI in E-commerce: From Chatbots to Recommendation Engines', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['E-commerce AI', 'Chatbots', 'Recommendations', 'Conversion']),
('Process Mining with AI: Discovering Hidden Inefficiencies', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['Process Mining', 'Efficiency', 'Optimization', 'Analysis']),
('AI-Powered Decision Making: Data-Driven Leadership', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['Decision Intelligence', 'Leadership', 'Data-Driven', 'Strategy']),
('Customer Service AI: Beyond Simple Chatbots', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['Customer Service', 'AI Support', 'Automation', 'Experience']),
('Building an AI-First Organization: Cultural Transformation', (SELECT id FROM categories WHERE slug = 'business'), ARRAY['AI Culture', 'Transformation', 'Change Management', 'Innovation']),

-- Tutorial Category Topics (10)
('Getting Started with ChatGPT: Practical Use Cases', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['ChatGPT', 'Getting Started', 'Use Cases', 'Tutorial']),
('Building Your First AI Agent with LangChain', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['LangChain', 'AI Agents', 'Development', 'Tutorial']),
('Fine-Tuning Large Language Models: A Step-by-Step Guide', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['Fine-tuning', 'LLM', 'Training', 'Guide']),
('Creating AI-Powered Chatbots with Python', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['Chatbot Development', 'Python', 'AI Programming', 'Tutorial']),
('Prompt Engineering Masterclass: Writing Better AI Prompts', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['Prompt Engineering', 'AI Communication', 'Best Practices', 'Tutorial']),
('Setting Up Your AI Development Environment in 2025', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['Development Setup', 'Tools', 'Environment', 'Tutorial']),
('AI Image Generation: From Text to Visuals with DALL-E 3', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['Image Generation', 'DALL-E', 'Creative AI', 'Tutorial']),
('Voice AI: Building Speech Recognition Systems', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['Voice AI', 'Speech Recognition', 'Audio Processing', 'Tutorial']),
('AI Testing and Quality Assurance: Best Practices', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['AI Testing', 'QA', 'Quality Control', 'Best Practices']),
('Deploying AI Models to Production: Complete Guide', (SELECT id FROM categories WHERE slug = 'tutorial'), ARRAY['Deployment', 'Production', 'MLOps', 'Guide']),

-- Industry Category Topics (10)
('AI in Healthcare: Diagnostic Revolution and Patient Care', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['Healthcare AI', 'Medical Diagnosis', 'Patient Care', 'Innovation']),
('Autonomous Vehicles: The State of Self-Driving in 2025', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['Autonomous Vehicles', 'Self-Driving', 'Transportation', 'Future']),
('AI in Finance: Algorithmic Trading and Fraud Detection', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['FinTech AI', 'Trading', 'Fraud Detection', 'Banking']),
('Education Technology: AI Tutors and Personalized Learning', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['EdTech', 'AI Tutoring', 'Personalized Learning', 'Education']),
('Legal Tech: AI in Contract Analysis and Legal Research', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['Legal AI', 'Contract Analysis', 'Legal Research', 'Law']),
('Agriculture 4.0: AI-Powered Farming and Crop Management', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['AgTech', 'Smart Farming', 'Crop Management', 'Agriculture']),
('Manufacturing Intelligence: AI in Industry 4.0', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['Smart Manufacturing', 'Industry 4.0', 'Automation', 'Production']),
('Retail Revolution: AI in Store Operations and Inventory', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['Retail AI', 'Store Operations', 'Inventory Management', 'Commerce']),
('Energy Sector Transformation with AI Optimization', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['Energy AI', 'Optimization', 'Sustainability', 'Utilities']),
('Real Estate Tech: AI in Property Valuation and Search', (SELECT id FROM categories WHERE slug = 'industry'), ARRAY['PropTech', 'Property AI', 'Valuation', 'Real Estate']);