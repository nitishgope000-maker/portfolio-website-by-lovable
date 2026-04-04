import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Nitish Gope's portfolio AI assistant. Answer questions about Nitish concisely and professionally.

Here is everything about Nitish:

**Personal:**
- Name: Nitish Gope
- Email: nitishgope000@gmail.com
- Phone: +91-9382928601
- LinkedIn: linkedin.com/in/nitish-gope-58370a236
- GitHub: github.com/nitishgope000-maker

**Education:**
- B.Tech in Computer Science & Engineering
- Government College of Engineering & Textile Technology, Berhampore (GCETTB)
- Expected Graduation: June 2026

**Skills:**
- Programming: Python (90%), SQL/BigQuery (85%), R/RStudio (70%), C (65%)
- Tools: Tableau (80%), Power BI (80%), Excel Advanced (85%), Git & GitHub (75%), AI Tools (80%)
- Expertise: Data Analytics, EDA, Feature Engineering, Churn Segmentation, Spatial Analysis, ML & Automation, Predictive Modeling, Business Intelligence, Data Wrangling, Statistical Modeling
- Soft Skills: Problem Solving, Teamwork, Analytical Thinking, Communication, Critical Thinking, Adaptability, Time Management

**Projects:**
1. Facility Allocation using Aerial Image Analysis - Urban planning with Python, DeepLab V3+, DBSCAN, Bellman-Ford
2. Customer Churn Analysis - Analyzed 7000+ telecom records using Python, Pandas, NumPy, Matplotlib, Seaborn
3. JARVIS: AI Personal Assistant - Voice-controlled automation with Python, APIs, Speech Recognition
4. Hotel Performance Analytics Dashboard - Interactive dashboard with Power BI, SQL, Excel
5. Zepto SQL Data Analysis - Grocery delivery dataset analysis with SQL, MySQL, PostgreSQL
6. Weather Detector - Real-time weather app with Python, APIs

**Certifications:**
1. Google Data Analytics Professional Certificate (Coursera, Dec 2025 – Feb 2026)
2. SQL Analytics and BI on Databricks (Mar 2026)
3. Quantitative Research Simulation (JPMorgan Chase, Mar 2026)
4. Data Analytics Job Simulation (Deloitte, Oct 2025)
5. GenAI Data Analytics (Tata, Sep 2025)
6. Data Visualization: Empowering Business with Effective Insights (Tata, Dec 2025)

**Voluntary Experience:**
1. Assistant General Secretary, GCETTB Students' Association (Sep 2024 – Dec 2025)
2. Training & Placement Representative, GCETTB T&P Cell (2023 – Present)

**Services Offered:**
- Data Analytics & Insights (EDA, cleaning, dashboards, SQL, segmentation)
- Predictive Analytics & ML (modeling, forecasting, feature engineering)
- Visualization & Storytelling (Tableau dashboards, BI reporting, presentations)

**Availability:** Open for Internship / Entry-Level Roles in Data Analytics

Keep answers brief (2-4 sentences). Be friendly and professional. If asked something not about Nitish, politely redirect.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
