/**
 * 36-Month Bi-Monthly Visit Definitions — 19 unique assessments
 * Months: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36
 */
const JOURNEY_VISITS = [
  {
    month: 0,
    phase: 1,
    title: 'Baseline Intake & Program Launch',
    focus: 'Establish baseline, set goals, and initiate GLP-1 protocol with habit foundations.',
    insight: {
      patient: 'This is the start of your 36-month journey. Success depends on medication adherence, protein-first eating, and daily movement — not perfection.',
      clinician: 'Document baseline metrics, confirm GLP-1 candidacy, set realistic TBWL targets (5% by M3, 15–20% by M12), and establish protein/step goals.',
    },
    sections: [
      {
        heading: 'Program Goals & Readiness',
        fields: [
          { id: 'primaryGoal', label: 'Primary weight/health goal for next 6 months', type: 'textarea' },
          { id: 'glp1StartPlan', label: 'GLP-1 initiation plan (drug, starting dose, titration schedule)', type: 'textarea' },
          { id: 'habitReadiness', label: 'Habit readiness (1=not ready, 10=fully committed)', type: 'scale' },
          { id: 'supportPerson', label: 'Primary support person / caregiver involved', type: 'text' },
        ],
      },
      {
        heading: 'Baseline Lifestyle Snapshot',
        fields: [
          { id: 'currentSteps', label: 'Average daily steps (baseline)', type: 'number', placeholder: 'e.g. 4500' },
          { id: 'proteinTarget', label: 'Daily protein target (g)', type: 'number', placeholder: 'e.g. 100' },
          { id: 'barriers', label: 'Top 3 barriers to weight management', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 2,
    phase: 1,
    title: 'GI Tolerance & Hydration Check',
    focus: 'Monitor early GLP-1 side effects and establish hydration/fiber routines.',
    insight: {
      patient: 'Nausea and constipation are common early on. Small meals, hydration, and fiber usually help — tell your clinician before stopping medication.',
      clinician: 'Assess GI tolerance; adjust titration if needed. Reinforce protein-first, small meals, 2L+ water, and fiber supplementation.',
    },
    sections: [
      {
        heading: 'GI & Medication Tolerance',
        fields: [
          { id: 'nauseaScale', label: 'Nausea severity (0=none, 10=severe)', type: 'scale' },
          { id: 'constipation', label: 'Constipation issues', type: 'select', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { id: 'reflux', label: 'Reflux / heartburn', type: 'select', options: ['None', 'Occasional', 'Frequent', 'Daily'] },
          { id: 'doseChanges', label: 'Any dose adjustments since last visit?', type: 'textarea' },
        ],
      },
      {
        heading: 'Hydration & Nutrition',
        fields: [
          { id: 'waterIntake', label: 'Daily water intake (litres)', type: 'text', placeholder: 'e.g. 2.0' },
          { id: 'proteinAdherence', label: 'Meeting protein target? (1–10)', type: 'scale' },
          { id: 'fiberSupplement', label: 'Using fiber supplement?', type: 'checkbox', labelCheck: 'Yes — fiber supplement in use' },
        ],
      },
    ],
  },
  {
    month: 4,
    phase: 1,
    title: 'Early Response & Appetite Assessment',
    focus: 'Evaluate initial weight response, appetite suppression, and side-effect trajectory.',
    insight: {
      patient: 'Early weight loss often includes water weight. Focus on how you feel — appetite control and energy — not just the scale.',
      clinician: 'Expect 2–4% TBWL by M4. If <2% with good adherence, review dose, adherence barriers, and secondary causes.',
    },
    sections: [
      {
        heading: 'Early Weight Response',
        fields: [
          { id: 'tbwlPercent', label: 'Total body weight loss since baseline (%)', type: 'number', placeholder: 'e.g. 3.5' },
          { id: 'appetiteControl', label: 'Appetite suppression rating (1–10)', type: 'scale' },
          { id: 'energyLevel', label: 'Energy level vs baseline (1–10)', type: 'scale' },
        ],
      },
      {
        heading: 'Side Effect Log',
        fields: [
          { id: 'sideEffects', label: 'Ongoing side effects', type: 'textarea' },
          { id: 'medicationAdherence', label: 'Medication adherence (1–10)', type: 'scale' },
          { id: 'earlyWins', label: 'Non-scale victories noticed', type: 'textarea', placeholder: 'Better sleep, less joint pain, clothes fitting…' },
        ],
      },
    ],
  },
  {
    month: 6,
    phase: 2,
    title: '5% TBWL Milestone & Mood Screen',
    focus: 'Confirm 5% TBWL milestone, quick mood/anxiety screen, and waist trend.',
    insight: {
      patient: 'Losing 5% of your body weight improves metabolism and joint health. Celebrate this — it is a major clinical milestone.',
      clinician: 'Target 5% TBWL by M6. Screen mood (PHQ-2/GAD-2). Order waist measurement; consider labs if not done at baseline.',
    },
    sections: [
      {
        heading: 'Milestone Metrics',
        fields: [
          { id: 'tbwlPercent', label: 'TBWL since baseline (%)', type: 'number' },
          { id: 'waistChange', label: 'Waist change since baseline (cm)', type: 'text', placeholder: 'e.g. -4 cm' },
          { id: 'milestoneMet', label: '5% TBWL milestone achieved?', type: 'checkbox', labelCheck: 'Yes — 5% TBWL achieved' },
        ],
      },
      {
        heading: 'Quick Mood Screen (PHQ-2 / GAD-2)',
        fields: [
          { id: 'phq2Interest', label: 'PHQ-2: Little interest/pleasure (0–3)', type: 'select', options: ['0', '1', '2', '3'] },
          { id: 'phq2Depressed', label: 'PHQ-2: Feeling down (0–3)', type: 'select', options: ['0', '1', '2', '3'] },
          { id: 'gad2Anxious', label: 'GAD-2: Feeling nervous (0–3)', type: 'select', options: ['0', '1', '2', '3'] },
          { id: 'gad2Worry', label: 'GAD-2: Unable to stop worrying (0–3)', type: 'select', options: ['0', '1', '2', '3'] },
          { id: 'moodReferral', label: 'Referral needed for mood support?', type: 'checkbox', labelCheck: 'Yes — refer for mental health support' },
        ],
      },
    ],
  },
  {
    month: 8,
    phase: 2,
    title: 'Nutrition Adherence Deep Dive',
    focus: 'Assess protein intake, meal timing, and emotional eating patterns.',
    insight: {
      patient: 'Protein at every meal protects muscle while you lose fat. Eating slowly helps you recognise fullness on GLP-1 therapy.',
      clinician: 'Target 1.2–1.5 g protein/kg IBW. Screen emotional eating; adjust meal structure if hunger returns between doses.',
    },
    sections: [
      {
        heading: 'Nutrition Quality',
        fields: [
          { id: 'proteinGrams', label: 'Average daily protein (g)', type: 'number' },
          { id: 'proteinPerKg', label: 'Protein per kg body weight (g/kg)', type: 'text' },
          { id: 'mealsPerDay', label: 'Meals per day', type: 'select', options: ['1–2', '3', '4–5', '6+'] },
          { id: 'eatingSpeed', label: 'Eating speed', type: 'select', options: ['Slow/mindful', 'Moderate', 'Fast/rushed'] },
        ],
      },
      {
        heading: 'Behavioural Eating',
        fields: [
          { id: 'emotionalEating', label: 'Emotional eating frequency (1=rare, 10=daily)', type: 'scale' },
          { id: 'weekendAdherence', label: 'Weekend/social eating adherence (1–10)', type: 'scale' },
          { id: 'nutritionNotes', label: 'Nutrition adjustments made', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 10,
    phase: 2,
    title: 'Activity Ramp & Exercise Consistency',
    focus: 'Track steps, resistance training, and NEAT as weight loss accelerates.',
    insight: {
      patient: 'Resistance training 2×/week tells your body to keep muscle. Daily steps beyond workouts burn extra calories (NEAT).',
      clinician: 'Target 7,500–10,000 steps/day and 2× resistance/week. Assess barriers; prescribe progressive overload if cleared.',
    },
    sections: [
      {
        heading: 'Exercise Vital Signs',
        fields: [
          { id: 'stepsPerWeek', label: 'Average steps per day', type: 'number' },
          { id: 'moderateMins', label: 'Moderate exercise (min/week)', type: 'number' },
          { id: 'resistanceSessions', label: 'Resistance sessions per week', type: 'number' },
          { id: 'neatRating', label: 'Daily NEAT / general activity (1–10)', type: 'scale' },
        ],
      },
      {
        heading: 'Functional Goals',
        fields: [
          { id: 'fitnessGoal', label: 'Current fitness goal', type: 'text', placeholder: 'e.g. climb stairs without breathlessness' },
          { id: 'exerciseBarriers', label: 'Exercise barriers', type: 'textarea' },
          { id: 'injuryPain', label: 'Joint pain / injury limiting activity?', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 12,
    phase: 2,
    title: 'Year-1 Annual Comprehensive Review',
    focus: 'Full annual labs, therapeutic dose confirmation, and 15% TBWL evaluation.',
    insight: {
      patient: 'One year in — you have built new habits. Annual labs show how your metabolism has improved beyond the scale.',
      clinician: 'Order HbA1c, lipids, LFTs, renal, TSH. Confirm therapeutic GLP-1 dose. Target 15–20% TBWL; discuss Year 2 focus.',
    },
    sections: [
      {
        heading: 'Annual Metrics',
        fields: [
          { id: 'tbwlPercent', label: 'TBWL since baseline (%)', type: 'number' },
          { id: 'therapeuticDose', label: 'At therapeutic GLP-1 dose?', type: 'checkbox', labelCheck: 'Yes — at target therapeutic dose' },
          { id: 'labsOrdered', label: 'Annual labs ordered/completed', type: 'textarea', placeholder: 'HbA1c, lipids, LFTs, CBC, renal…' },
          { id: 'labResults', label: 'Key lab results summary', type: 'textarea' },
        ],
      },
      {
        heading: 'Year-1 Reflection',
        fields: [
          { id: 'biggestWin', label: 'Patient\'s biggest win this year', type: 'textarea' },
          { id: 'year2Focus', label: 'Priority focus for Year 2', type: 'textarea' },
          { id: 'medicationPlan', label: 'GLP-1 plan for Year 2', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 14,
    phase: 3,
    title: 'Plateau Early Warning Assessment',
    focus: 'Detect slowing weight loss, diet fatigue, and need for metabolic adjustment.',
    insight: {
      patient: 'Weight loss naturally slows after 12–18 months. A plateau is not failure — it means your body is adapting.',
      clinician: 'Plot weight trend. If plateau >4 weeks with adherence >7/10, consider diet break, macro cycling, or dose review.',
    },
    sections: [
      {
        heading: 'Weight Trend',
        fields: [
          { id: 'weightTrend', label: 'Weight trend last 8 weeks', type: 'select', options: ['Still losing', 'Plateau (<1 kg change)', 'Slight regain (<2 kg)', 'Regain (>2 kg)'] },
          { id: 'dietFatigue', label: 'Diet fatigue / tracking burnout (1–10)', type: 'scale' },
          { id: 'calorieAdjustment', label: 'Caloric intake adjusted for new weight?', type: 'checkbox', labelCheck: 'Yes — calories recalculated' },
        ],
      },
      {
        heading: 'Intervention Plan',
        fields: [
          { id: 'plateauStrategy', label: 'Strategy discussed', type: 'textarea', placeholder: 'Diet break, macro cycling, refeed day…' },
          { id: 'patientPlateauMindset', label: 'Patient understanding of plateau (1–10)', type: 'scale' },
        ],
      },
    ],
  },
  {
    month: 16,
    phase: 3,
    title: 'Sleep & Stress Assessment',
    focus: 'Screen sleep quality, STOP-BANG lite, and stress-coping strategies.',
    insight: {
      patient: 'Poor sleep and high stress raise cortisol and hunger hormones. Fixing sleep often unlocks the next phase of weight loss.',
      clinician: 'Screen OSA (STOP-BANG). <6 hr sleep correlates with regain risk. Refer sleep study if score ≥3 or symptomatic.',
    },
    sections: [
      {
        heading: 'Sleep Quality',
        fields: [
          { id: 'sleepHours', label: 'Average sleep (hours/night)', type: 'select', options: ['<5', '5–6', '7–8', '8–9', '>9'] },
          { id: 'sleepQuality', label: 'Sleep quality (1–10)', type: 'scale' },
          { id: 'snoring', label: 'Loud snoring / witnessed apnoea?', type: 'checkbox', labelCheck: 'Yes — snoring or apnoea symptoms' },
          { id: 'daytimeSleepiness', label: 'Daytime sleepiness (1–10)', type: 'scale' },
        ],
      },
      {
        heading: 'Stress & Coping',
        fields: [
          { id: 'stressLevel', label: 'Perceived stress (1–10)', type: 'scale' },
          { id: 'copingStrategies', label: 'Current coping strategies (non-food)', type: 'textarea' },
          { id: 'stressEating', label: 'Stress-driven eating (1–10)', type: 'scale' },
        ],
      },
    ],
  },
  {
    month: 18,
    phase: 3,
    title: 'Recomposition & Plateau Acceptance',
    focus: 'Shift focus from scale to body composition, strength, and long-term GLP-1 strategy.',
    insight: {
      patient: 'The number on the scale may pause while your body rebuilds muscle and loses fat. Strength gains are a sign of success.',
      clinician: 'Discuss max plateau (common M12–18). Order DEXA/BIA if available. Plan long-term GLP-1: maintain, taper, or interval dosing.',
    },
    sections: [
      {
        heading: 'Body Composition',
        fields: [
          { id: 'bodyCompMethod', label: 'Body composition assessment', type: 'select', options: ['DEXA', 'BIA', 'Skinfold', 'Not done', 'Planned'] },
          { id: 'bodyFatPercent', label: 'Body fat % (if available)', type: 'text' },
          { id: 'strengthGains', label: 'Strength / functional improvements', type: 'textarea' },
        ],
      },
      {
        heading: 'Long-Term Medication Strategy',
        fields: [
          { id: 'glp1Strategy', label: 'GLP-1 long-term plan discussed', type: 'select', options: ['Maintain current dose', 'Taper dose', 'Interval dosing', 'Discontinue trial', 'Undecided'] },
          { id: 'plateauAcceptance', label: 'Patient acceptance of plateau (1–10)', type: 'scale' },
          { id: 'recompNotes', label: 'Recomposition focus areas', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 20,
    phase: 3,
    title: 'Psychosocial Adjustment & Body Image',
    focus: 'Assess adaptation to new body size, stigma resilience, and social eating confidence.',
    insight: {
      patient: 'Your identity may still be catching up with your new body. It is normal to feel awkward in social eating situations at first.',
      clinician: 'Screen body image distress, weight stigma internalisation. Refer psychology if social anxiety or BED symptoms emerge.',
    },
    sections: [
      {
        heading: 'Body Image & Identity',
        fields: [
          { id: 'bodyImage', label: 'Body image satisfaction (1–10)', type: 'scale' },
          { id: 'identityShift', label: 'Adjusting to new body size (1–10)', type: 'scale' },
          { id: 'stigmaExperience', label: 'Weight stigma experienced recently?', type: 'textarea' },
        ],
      },
      {
        heading: 'Social Eating',
        fields: [
          { id: 'socialEatingConfidence', label: 'Confidence eating in social settings (1–10)', type: 'scale' },
          { id: 'socialTriggers', label: 'Social eating triggers identified', type: 'textarea' },
          { id: 'supportNeeded', label: 'Additional psychosocial support needed?', type: 'checkbox', labelCheck: 'Yes — referral recommended' },
        ],
      },
    ],
  },
  {
    month: 22,
    phase: 3,
    title: 'Habit Sustainability Audit',
    focus: 'Evaluate transition toward intuitive eating and reduced tracking dependency.',
    insight: {
      patient: 'The goal is to eat well without obsessive tracking. You are learning to trust hunger and fullness cues again.',
      clinician: 'Assess meal-prep consistency and intuitive eating readiness. Begin reducing tracking if adherence stable >6 months.',
    },
    sections: [
      {
        heading: 'Habit Durability',
        fields: [
          { id: 'mealPrepConsistency', label: 'Meal prep / planning consistency (1–10)', type: 'scale' },
          { id: 'trackingBurden', label: 'Food tracking burden (1=none, 10=exhausting)', type: 'scale' },
          { id: 'intuitiveEating', label: 'Intuitive eating readiness (1–10)', type: 'scale' },
        ],
      },
      {
        heading: 'Sustainable Practices',
        fields: [
          { id: 'lifelongHabits', label: 'Habits that feel sustainable long-term', type: 'textarea' },
          { id: 'habitsToDrop', label: 'Habits to phase out', type: 'textarea', placeholder: 'e.g. daily calorie counting' },
          { id: 'habitNotes', label: 'Provider recommendations', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 24,
    phase: 3,
    title: '2-Year Maintenance Gate',
    focus: 'Confirm >20% TBWL maintained 6 months; review medication and relapse risk.',
    insight: {
      patient: 'Two years of sustained change is extraordinary. Maintenance is now your primary job — protecting what you built.',
      clinician: 'Verify >20% TBWL maintained ≥6 months. Annual labs. Formalise medication maintenance or taper plan.',
    },
    sections: [
      {
        heading: '2-Year Milestone',
        fields: [
          { id: 'tbwlPercent', label: 'Current TBWL (%)', type: 'number' },
          { id: 'maintained6mo', label: '>20% TBWL maintained 6+ months?', type: 'checkbox', labelCheck: 'Yes — >20% TBWL maintained ≥6 months' },
          { id: 'regainSincePeak', label: 'Regain since lowest weight (kg)', type: 'text' },
        ],
      },
      {
        heading: 'Maintenance Planning',
        fields: [
          { id: 'medicationStatus', label: 'Current GLP-1 status', type: 'textarea' },
          { id: 'relapseRisk', label: 'Relapse risk factors identified', type: 'textarea' },
          { id: 'maintenanceContract', label: 'Maintenance commitments agreed', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 26,
    phase: 4,
    title: 'Relapse Prevention Planning',
    focus: 'Identify high-risk situations and build holiday/event coping plans.',
    insight: {
      patient: 'A 2 kg regain is not a catastrophe — it is a signal. Having a plan for holidays and stress prevents larger regain.',
      clinician: 'Create written relapse prevention plan. Identify top 3 triggers. Define "amber zone" (3–5 kg regain) action steps.',
    },
    sections: [
      {
        heading: 'Risk Identification',
        fields: [
          { id: 'highRiskTriggers', label: 'Top high-risk situations', type: 'textarea', placeholder: 'Holidays, work travel, bereavement…' },
          { id: 'warningSignWeight', label: 'Personal "amber zone" weight (kg)', type: 'text' },
          { id: 'actionPlan', label: 'Action plan if weight enters amber zone', type: 'textarea' },
        ],
      },
      {
        heading: 'Event Planning',
        fields: [
          { id: 'upcomingEvents', label: 'Upcoming high-risk events', type: 'textarea' },
          { id: 'eventStrategy', label: 'Coping strategy for events', type: 'textarea' },
          { id: 'emergencyContact', label: 'Who to contact if struggling?', type: 'text' },
        ],
      },
    ],
  },
  {
    month: 28,
    phase: 4,
    title: 'Self-Management Independence',
    focus: 'Assess autonomy in exercise and nutrition without clinician prompting.',
    insight: {
      patient: 'You are becoming your own coach. Adjusting workouts and meals independently is a graduation skill.',
      clinician: 'Evaluate self-efficacy. Patient should demonstrate independent exercise variation and nutrition decisions.',
    },
    sections: [
      {
        heading: 'Autonomy Assessment',
        fields: [
          { id: 'exerciseAutonomy', label: 'Exercise self-management (1–10)', type: 'scale' },
          { id: 'nutritionAutonomy', label: 'Nutrition self-management (1–10)', type: 'scale' },
          { id: 'reducedTracking', label: 'Successfully reduced food tracking?', type: 'checkbox', labelCheck: 'Yes — tracking reduced or stopped' },
        ],
      },
      {
        heading: 'Independence Goals',
        fields: [
          { id: 'selfMgmtWins', label: 'Examples of independent decision-making', type: 'textarea' },
          { id: 'remainingDependence', label: 'Areas still needing support', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 30,
    phase: 4,
    title: 'Comorbidity Re-Screen',
    focus: 'Re-assess BP, glucose, joint health, and OSA symptoms after 2.5 years.',
    insight: {
      patient: 'Even in maintenance, monitoring blood pressure, blood sugar, and joint health protects your long-term wellbeing.',
      clinician: 'Repeat BP, HbA1c/glucose, lipids. Screen OSA if weight regained or symptoms return. Assess NAFLD markers if indicated.',
    },
    sections: [
      {
        heading: 'Vital Comorbidities',
        fields: [
          { id: 'bpToday', label: 'Blood pressure today', type: 'text', placeholder: 'e.g. 122/78' },
          { id: 'glucoseHba1c', label: 'HbA1c / fasting glucose', type: 'text' },
          { id: 'lipids', label: 'Lipid panel (if recent)', type: 'text' },
        ],
      },
      {
        heading: 'Symptom Screen',
        fields: [
          { id: 'jointPain', label: 'Joint pain / mobility issues', type: 'textarea' },
          { id: 'osaSymptoms', label: 'OSA symptoms returned?', type: 'checkbox', labelCheck: 'Yes — snoring, apnoea, or daytime sleepiness' },
          { id: 'nafldMarkers', label: 'Liver enzymes / NAFLD status', type: 'text' },
          { id: 'comorbidityActions', label: 'Actions / referrals', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 32,
    phase: 4,
    title: 'Support Systems & Environment',
    focus: 'Review family support, food environment, and access barriers.',
    insight: {
      patient: 'Your environment shapes your choices more than willpower. Building support at home makes maintenance easier.',
      clinician: 'Assess social determinants: food access, family support, financial barriers, stigma. Connect community resources.',
    },
    sections: [
      {
        heading: 'Social Support',
        fields: [
          { id: 'familySupport', label: 'Family/household support (1–10)', type: 'scale' },
          { id: 'accountabilityPartner', label: 'Accountability partner active?', type: 'checkbox', labelCheck: 'Yes — accountability partner in place' },
          { id: 'supportGaps', label: 'Support gaps identified', type: 'textarea' },
        ],
      },
      {
        heading: 'Food Environment',
        fields: [
          { id: 'homeFoodEnv', label: 'Home food environment (1=obesogenic, 10=supportive)', type: 'scale' },
          { id: 'foodAccess', label: 'Access to healthy food', type: 'select', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
          { id: 'financialBarriers', label: 'Financial barriers to care/nutrition', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 34,
    phase: 4,
    title: 'Pre-Graduation Readiness',
    focus: 'Confirm confidence, long-term medication plan, and graduation criteria.',
    insight: {
      patient: 'Graduation is not the end — it is proof you can maintain independently. You are almost there.',
      clinician: 'Verify graduation criteria: >20% TBWL maintained ≥12 months, stable habits, clear long-term medication plan.',
    },
    sections: [
      {
        heading: 'Graduation Criteria',
        fields: [
          { id: 'gradWeightStable', label: 'Weight stable within 3 kg for 12+ months?', type: 'checkbox', labelCheck: 'Yes — weight stable ≥12 months' },
          { id: 'gradHabitsStable', label: 'Core habits self-sustaining (1–10)', type: 'scale' },
          { id: 'gradConfidence', label: 'Confidence maintaining without program (1–10)', type: 'scale' },
        ],
      },
      {
        heading: 'Post-Program Plan',
        fields: [
          { id: 'postProgramMed', label: 'Long-term medication plan', type: 'textarea' },
          { id: 'postProgramFollowUp', label: 'Follow-up schedule after graduation', type: 'textarea', placeholder: 'e.g. every 6 months' },
          { id: 'gradConcerns', label: 'Patient concerns about graduation', type: 'textarea' },
        ],
      },
    ],
  },
  {
    month: 36,
    phase: 4,
    title: 'Program Graduation & Legacy Plan',
    focus: 'Final metrics, DEXA/labs, graduation checklist, and lifetime maintenance contract.',
    insight: {
      patient: 'Congratulations — you have completed the 36-month Obesity Winner journey. Your new habits are your lifelong health legacy.',
      clinician: 'Complete final labs, DEXA/BIA, graduation checklist. Sign lifetime maintenance contract. Schedule 6-month follow-up.',
    },
    sections: [
      {
        heading: 'Final Metrics',
        fields: [
          { id: 'finalTbwl', label: 'Final TBWL (%)', type: 'number' },
          { id: 'finalWeight', label: 'Final weight (kg)', type: 'text' },
          { id: 'finalBmi', label: 'Final BMI', type: 'text' },
          { id: 'finalLabs', label: 'Final lab panel results', type: 'textarea' },
          { id: 'finalDexa', label: 'DEXA / body composition results', type: 'textarea' },
        ],
      },
      {
        heading: 'Graduation & Legacy',
        fields: [
          { id: 'graduationChecklist', label: 'Graduation milestones confirmed', type: 'textarea', placeholder: 'Weight maintained, labs improved, habits established…' },
          { id: 'lifetimeContract', label: 'Lifetime maintenance commitments', type: 'textarea' },
          { id: 'patientReflection', label: 'Patient reflection on 3-year journey', type: 'textarea' },
          { id: 'providerFinalNotes', label: 'Provider final summary', type: 'textarea' },
        ],
      },
    ],
  },
];
