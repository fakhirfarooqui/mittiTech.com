// ============================================================
// THE MITTI TECH — CENTRALIZED MOCK DATA
// All data is DEMO / ILLUSTRATIVE — not real measurements
// ============================================================

// ============================================================
// FARMS
// ============================================================
export const farms = [
  {
    id: 'farm-1',
    name: 'Green Valley Farm',
    location: 'Lucknow, Uttar Pradesh',
    area: 12,
    areaUnit: 'Acres',
    crops: ['Bhindi', 'Aloo'],
    primaryCrop: 'Bhindi',
    soilHealth: 78,
    cropHealth: 82,
    farmHealth: 'Good',
    lastScan: 'Today, 09:42 AM',
    monitoringStatus: 'Active',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    fields: [
      {
        id: 'field-a',
        name: 'Field A',
        area: 5,
        crop: 'Bhindi',
        stage: 'Vegetative',
        cropHealth: 84,
        soilHealth: 80,
        lastScan: 'Today, 09:42 AM',
        color: '#10b981',
      },
      {
        id: 'field-b',
        name: 'Field B',
        area: 4,
        crop: 'Aloo',
        stage: 'Tuber Formation',
        cropHealth: 76,
        soilHealth: 72,
        lastScan: 'Yesterday, 03:15 PM',
        color: '#f59e0b',
      },
      {
        id: 'field-c',
        name: 'Field C',
        area: 3,
        crop: 'Wheat',
        stage: 'Sowing',
        cropHealth: 88,
        soilHealth: 85,
        lastScan: '2 days ago',
        color: '#60a5fa',
      },
    ],
  },
  {
    id: 'farm-2',
    name: 'Sunrise Farm',
    location: 'Kanpur, Uttar Pradesh',
    area: 8,
    areaUnit: 'Acres',
    crops: ['Tomato', 'Corn'],
    primaryCrop: 'Tomato',
    soilHealth: 65,
    cropHealth: 71,
    farmHealth: 'Moderate',
    lastScan: 'Yesterday, 02:30 PM',
    monitoringStatus: 'Active',
    coordinates: { lat: 26.4499, lng: 80.3319 },
    fields: [
      {
        id: 'sf-a',
        name: 'Field A',
        area: 5,
        crop: 'Tomato',
        stage: 'Flowering',
        cropHealth: 71,
        soilHealth: 65,
        lastScan: 'Yesterday',
        color: '#f87171',
      },
      {
        id: 'sf-b',
        name: 'Field B',
        area: 3,
        crop: 'Corn',
        stage: 'Tasseling',
        cropHealth: 78,
        soilHealth: 70,
        lastScan: '2 days ago',
        color: '#fbbf24',
      },
    ],
  },
  {
    id: 'farm-3',
    name: 'Demo Farm',
    location: 'Varanasi, Uttar Pradesh',
    area: 5,
    areaUnit: 'Acres',
    crops: ['Rice'],
    primaryCrop: 'Rice',
    soilHealth: 88,
    cropHealth: 90,
    farmHealth: 'Excellent',
    lastScan: '3 days ago',
    monitoringStatus: 'Standby',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    fields: [
      {
        id: 'df-a',
        name: 'Field A',
        area: 5,
        crop: 'Rice',
        stage: 'Tillering',
        cropHealth: 90,
        soilHealth: 88,
        lastScan: '3 days ago',
        color: '#34d399',
      },
    ],
  },
];

export const selectedFarm = farms[0];
export const selectedField = farms[0].fields[0];

// ============================================================
// SOIL DATA (DEMO / ILLUSTRATIVE)
// ============================================================
export const soilReadings = {
  farmId: 'farm-1',
  fieldId: 'field-a',
  scanTime: 'Today, 09:42 AM',
  scanId: 'SCN-2024-0923-001',
  isDemo: true,
  metrics: {
    soilHealthScore: 78,
    pH: { value: 6.8, unit: 'pH', status: 'good', range: '6.0–7.5 (Optimal)' },
    nitrogen: { value: 142, unit: 'kg/ha', status: 'moderate', range: '120–180 kg/ha' },
    phosphorus: { value: 38, unit: 'kg/ha', status: 'good', range: '30–60 kg/ha' },
    potassium: { value: 195, unit: 'kg/ha', status: 'good', range: '150–250 kg/ha' },
    ec: { value: 0.42, unit: 'dS/m', status: 'good', range: '0.2–0.8 dS/m' },
    moisture: { value: 34, unit: '%', status: 'moderate', range: '25–45% (Optimal)' },
    temperature: { value: 26.4, unit: '°C', status: 'good', range: '20–30°C' },
    organicMatter: { value: 1.8, unit: '%', status: 'low', range: '2–4% (Optimal)' },
  },
  recommendations: [
    'Increase organic matter through compost or green manure',
    'Nitrogen levels slightly low — consider top dressing',
    'Soil pH is within optimal range for Bhindi',
    'Moisture levels adequate — monitor irrigation schedule',
  ],
};

export const soilTrendData = {
  moisture: [
    { date: 'Sep 17', value: 28 },
    { date: 'Sep 18', value: 32 },
    { date: 'Sep 19', value: 30 },
    { date: 'Sep 20', value: 38 },
    { date: 'Sep 21', value: 35 },
    { date: 'Sep 22', value: 33 },
    { date: 'Sep 23', value: 34 },
  ],
  pH: [
    { date: 'Sep 17', value: 6.5 },
    { date: 'Sep 18', value: 6.6 },
    { date: 'Sep 19', value: 6.7 },
    { date: 'Sep 20', value: 6.7 },
    { date: 'Sep 21', value: 6.8 },
    { date: 'Sep 22', value: 6.8 },
    { date: 'Sep 23', value: 6.8 },
  ],
  nitrogen: [
    { date: 'Sep 17', value: 155 },
    { date: 'Sep 18', value: 150 },
    { date: 'Sep 19', value: 148 },
    { date: 'Sep 20', value: 145 },
    { date: 'Sep 21', value: 142 },
    { date: 'Sep 22', value: 140 },
    { date: 'Sep 23', value: 142 },
  ],
  temperature: [
    { date: 'Sep 17', value: 28.1 },
    { date: 'Sep 18', value: 27.5 },
    { date: 'Sep 19', value: 26.8 },
    { date: 'Sep 20', value: 25.9 },
    { date: 'Sep 21', value: 26.2 },
    { date: 'Sep 22', value: 26.6 },
    { date: 'Sep 23', value: 26.4 },
  ],
};

export const scanHistory = [
  {
    id: 'SCN-001',
    date: 'Sep 23, 2024',
    time: '09:42 AM',
    field: 'Field A',
    crop: 'Bhindi',
    soilHealth: 78,
    pH: 6.8,
    moisture: 34,
    scannedBy: 'Mitti Scanner v1.2',
  },
  {
    id: 'SCN-002',
    date: 'Sep 21, 2024',
    time: '08:15 AM',
    field: 'Field B',
    crop: 'Aloo',
    soilHealth: 72,
    pH: 6.5,
    moisture: 31,
    scannedBy: 'Mitti Scanner v1.2',
  },
  {
    id: 'SCN-003',
    date: 'Sep 20, 2024',
    time: '10:30 AM',
    field: 'Field A',
    crop: 'Bhindi',
    soilHealth: 75,
    pH: 6.7,
    moisture: 30,
    scannedBy: 'Mitti Scanner v1.2',
  },
  {
    id: 'SCN-004',
    date: 'Sep 18, 2024',
    time: '07:45 AM',
    field: 'Field C',
    crop: 'Wheat',
    soilHealth: 85,
    pH: 7.0,
    moisture: 28,
    scannedBy: 'Mitti Scanner v1.2',
  },
];

// ============================================================
// WEATHER DATA
// ============================================================
export const weatherData = {
  location: 'Lucknow, UP',
  temperature: 31,
  feelsLike: 35,
  condition: 'Partly Cloudy',
  humidity: 68,
  windSpeed: 12,
  windDir: 'NE',
  rainfall: 0,
  forecast: [
    { day: 'Today', icon: '⛅', high: 33, low: 24, rain: 10 },
    { day: 'Wed', icon: '🌧️', high: 29, low: 22, rain: 70 },
    { day: 'Thu', icon: '🌦️', high: 28, low: 21, rain: 45 },
    { day: 'Fri', icon: '☀️', high: 32, low: 23, rain: 5 },
    { day: 'Sat', icon: '☀️', high: 34, low: 25, rain: 5 },
  ],
};

// ============================================================
// ALERTS
// ============================================================
export const alerts = [
  {
    id: 'alt-1',
    type: 'soil_moisture',
    priority: 'attention',
    title: 'Low Soil Moisture — Field B',
    message: 'Soil moisture in Field B has dropped to 24%. Consider irrigation within 24 hours.',
    farm: 'Green Valley Farm',
    field: 'Field B',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'alt-2',
    type: 'crop_health',
    priority: 'critical',
    title: 'Potential Leaf Discoloration — Tomato',
    message: 'Crop health monitoring detected visual changes in Sunrise Farm tomato crop. Review recommended.',
    farm: 'Sunrise Farm',
    field: 'Field A',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 'alt-3',
    type: 'ai_insight',
    priority: 'info',
    title: 'Mitti AI Recommendation Ready',
    message: 'New crop advisory generated for Green Valley Farm — Bhindi nitrogen management.',
    farm: 'Green Valley Farm',
    field: 'Field A',
    time: '8 hours ago',
    read: true,
  },
  {
    id: 'alt-4',
    type: 'scan_complete',
    priority: 'info',
    title: 'Soil Scan Complete',
    message: 'Soil scan SCN-2024-0923-001 completed successfully for Field A.',
    farm: 'Green Valley Farm',
    field: 'Field A',
    time: 'Today, 09:42 AM',
    read: true,
  },
  {
    id: 'alt-5',
    type: 'weather',
    priority: 'attention',
    title: 'Rain Expected Tomorrow',
    message: 'Weather forecast indicates 70% chance of rainfall. Consider adjusting irrigation schedule.',
    farm: 'All Farms',
    field: 'All Fields',
    time: 'Today, 07:00 AM',
    read: false,
  },
  {
    id: 'alt-6',
    type: 'irrigation',
    priority: 'info',
    title: 'Irrigation Reminder — Field A',
    message: 'Scheduled irrigation for Field A is due tomorrow at 6:00 AM.',
    farm: 'Green Valley Farm',
    field: 'Field A',
    time: 'Yesterday, 06:00 PM',
    read: true,
  },
  {
    id: 'alt-7',
    type: 'scanner',
    priority: 'attention',
    title: 'Scanner Battery Low',
    message: 'Mitti Scanner battery is at 18%. Please charge before next scan session.',
    farm: 'Green Valley Farm',
    field: 'N/A',
    time: 'Yesterday, 11:30 AM',
    read: true,
  },
];

// ============================================================
// ACTIVITY FEED
// ============================================================
export const recentActivity = [
  {
    id: 'act-1',
    type: 'scan',
    icon: '🔬',
    title: 'Soil Scan Completed',
    description: 'Green Valley Farm — Field A — Bhindi',
    time: 'Today, 09:42 AM',
    badge: 'Scan',
  },
  {
    id: 'act-2',
    type: 'ai',
    icon: '🤖',
    title: 'AI Advisory Generated',
    description: 'Mitti AI created nitrogen management plan for Field A',
    time: 'Today, 09:50 AM',
    badge: 'AI',
  },
  {
    id: 'act-3',
    type: 'image',
    icon: '📷',
    title: 'Crop Image Analyzed',
    description: 'MittiVision processed Bhindi leaf image — Demo Analysis',
    time: 'Today, 08:20 AM',
    badge: 'Vision',
  },
  {
    id: 'act-4',
    type: 'monitoring',
    icon: '🛰️',
    title: 'Field Monitoring Update',
    description: 'FieldSense updated vegetation data for all fields',
    time: 'Yesterday, 06:00 PM',
    badge: 'Remote',
  },
  {
    id: 'act-5',
    type: 'irrigation',
    icon: '💧',
    title: 'Irrigation Reminder',
    description: 'Field B moisture below threshold — irrigation suggested',
    time: 'Yesterday, 03:00 PM',
    badge: 'Alert',
  },
  {
    id: 'act-6',
    type: 'report',
    icon: '📊',
    title: 'Weekly Report Ready',
    description: 'Soil health report for week of Sep 16-22 generated',
    time: 'Sep 22, 08:00 AM',
    badge: 'Report',
  },
];

// ============================================================
// AI CONVERSATIONS
// ============================================================
export const aiConversations = [
  {
    id: 'conv-1',
    title: 'Bhindi growth slow hai',
    preview: 'Soil nutrients aur moisture review karein...',
    time: 'Today',
    farm: 'Green Valley Farm',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Mere bhindi ke crop mein growth slow hai. Kya problem ho sakti hai?',
        time: '09:50 AM',
      },
      {
        id: 'msg-2',
        role: 'ai',
        content: `Based on the demo farm context (Green Valley Farm, Field A), slow Bhindi growth can be influenced by several factors:

**Nutrient Analysis (Illustrative Demo Data):**
- Nitrogen: 142 kg/ha — slightly below optimal range
- Soil moisture: 34% — within acceptable range

**Possible Contributing Factors (Demo):**
1. Nitrogen deficiency can slow vegetative growth
2. Soil temperature at 26.4°C is suitable for Bhindi
3. Organic matter at 1.8% is below the 2-4% optimal range

**Suggested Next Steps:**
- Review nitrogen top-dressing schedule
- Increase organic matter through compost
- Monitor irrigation to maintain consistent moisture

⚠️ *This is illustrative demo content. Please consult an agricultural expert for verified recommendations.*`,
        time: '09:51 AM',
        suggestions: [
          'Review soil readings',
          'Check irrigation schedule',
          'Scan field again',
        ],
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'pH level suitable hai?',
    preview: 'pH 6.8 is within the optimal range for...',
    time: 'Today',
    farm: 'Green Valley Farm',
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'Mere soil ka pH 6.8 hai. Kya ye Bhindi ke liye suitable hai?',
        time: '08:30 AM',
      },
      {
        id: 'msg-4',
        role: 'ai',
        content: `**pH Analysis — Illustrative Demo Result**

Your soil pH of **6.8** falls within the optimal range for Bhindi (Okra) cultivation.

**Reference Ranges (General Agricultural Guidelines):**
- Bhindi optimal pH: 6.0 – 7.5
- Current reading: 6.8 ✓ Good

**Context:**
Bhindi generally grows well in slightly acidic to neutral soil. A pH of 6.8 supports good nutrient availability for nitrogen, phosphorus, and potassium uptake.

**Note:** This information is based on general agricultural guidelines and the demo soil reading. Always verify with a certified soil testing laboratory for production decisions.

⚠️ *Demo Data — Consult an agricultural expert for verified advice.*`,
        time: '08:31 AM',
        suggestions: [
          'View full soil report',
          'Check nutrient availability',
          'Compare with Field B',
        ],
      },
    ],
  },
  {
    id: 'conv-3',
    title: 'Fertilizer schedule kya ho?',
    preview: 'Based on the demo soil readings...',
    time: 'Yesterday',
    farm: 'Green Valley Farm',
    messages: [],
  },
  {
    id: 'conv-4',
    title: 'Tomato disease symptoms',
    preview: 'Several conditions can cause leaf...',
    time: 'Sep 22',
    farm: 'Sunrise Farm',
    messages: [],
  },
  {
    id: 'conv-5',
    title: 'Irrigation kitna dena chahiye?',
    preview: 'Bhindi requires consistent moisture...',
    time: 'Sep 21',
    farm: 'Green Valley Farm',
    messages: [],
  },
];

// ============================================================
// CROP RECOMMENDATIONS
// ============================================================
export const cropRecommendations = [
  {
    id: 'rec-1',
    crop: 'Bhindi (Okra)',
    emoji: '🌿',
    suitability: 88,
    waterRequirement: 'Moderate',
    growthDuration: '45-65 days',
    season: 'Kharif',
    soilType: 'Well-drained loamy',
    reasons: [
      'Soil pH (6.8) is within optimal range',
      'Good potassium levels support fruiting',
      'Temperature range suitable for Bhindi',
    ],
    color: '#10b981',
    label: 'Best Match',
  },
  {
    id: 'rec-2',
    crop: 'Wheat (Gehun)',
    emoji: '🌾',
    suitability: 82,
    waterRequirement: 'Moderate-High',
    growthDuration: '90-120 days',
    season: 'Rabi',
    soilType: 'Well-drained clay loam',
    reasons: [
      'Soil EC within acceptable range',
      'Phosphorus levels support root development',
      'Suitable temperature for Rabi season',
    ],
    color: '#f59e0b',
    label: 'Recommended',
  },
  {
    id: 'rec-3',
    crop: 'Mustard (Sarson)',
    emoji: '🌻',
    suitability: 76,
    waterRequirement: 'Low-Moderate',
    growthDuration: '90-110 days',
    season: 'Rabi',
    soilType: 'Sandy loam to loam',
    reasons: [
      'Soil organic matter acceptable for mustard',
      'pH slightly favorable',
      'Low water requirement matches farm capacity',
    ],
    color: '#fbbf24',
    label: 'Good Option',
  },
  {
    id: 'rec-4',
    crop: 'Aloo (Potato)',
    emoji: '🥔',
    suitability: 70,
    waterRequirement: 'Moderate',
    growthDuration: '70-90 days',
    season: 'Rabi',
    soilType: 'Sandy loam',
    reasons: [
      'Potassium levels good for tuber development',
      'Soil moisture manageable',
      'Cool season crop for Rabi',
    ],
    color: '#a78bfa',
    label: 'Consider',
  },
  {
    id: 'rec-5',
    crop: 'Tomato (Tamatar)',
    emoji: '🍅',
    suitability: 65,
    waterRequirement: 'High',
    growthDuration: '60-80 days',
    season: 'Kharif/Rabi',
    soilType: 'Well-drained loamy',
    reasons: [
      'Nitrogen supplementation needed',
      'Good phosphorus for fruit development',
      'Requires consistent irrigation management',
    ],
    color: '#f87171',
    label: 'Possible',
  },
  {
    id: 'rec-6',
    crop: 'Rice (Chawal)',
    emoji: '🌾',
    suitability: 60,
    waterRequirement: 'Very High',
    growthDuration: '100-130 days',
    season: 'Kharif',
    soilType: 'Clay/Clay loam',
    reasons: [
      'High water requirement may strain resources',
      'Soil drainage may need modification',
      'Best suited in high rainfall areas',
    ],
    color: '#60a5fa',
    label: 'Limited Suitability',
  },
];

// ============================================================
// REPORTS
// ============================================================
export const reports = [
  {
    id: 'rpt-1',
    title: 'Soil Health Report — Field A',
    type: 'Soil Health',
    farm: 'Green Valley Farm',
    field: 'Field A',
    date: 'Sep 23, 2024',
    status: 'Ready',
    size: '1.2 MB',
    pages: 8,
  },
  {
    id: 'rpt-2',
    title: 'Farm Overview Report — Green Valley',
    type: 'Farm Overview',
    farm: 'Green Valley Farm',
    field: 'All Fields',
    date: 'Sep 22, 2024',
    status: 'Ready',
    size: '2.4 MB',
    pages: 14,
  },
  {
    id: 'rpt-3',
    title: 'Weekly Crop Health Summary',
    type: 'Crop Health',
    farm: 'All Farms',
    field: 'All Fields',
    date: 'Sep 22, 2024',
    status: 'Ready',
    size: '0.9 MB',
    pages: 6,
  },
  {
    id: 'rpt-4',
    title: 'Soil Scan History — Sep 2024',
    type: 'Scan History',
    farm: 'Green Valley Farm',
    field: 'All Fields',
    date: 'Sep 20, 2024',
    status: 'Ready',
    size: '1.8 MB',
    pages: 12,
  },
  {
    id: 'rpt-5',
    title: 'Field Comparison Analysis',
    type: 'Field Comparison',
    farm: 'Green Valley Farm',
    field: 'A vs B vs C',
    date: 'Sep 18, 2024',
    status: 'Ready',
    size: '3.1 MB',
    pages: 18,
  },
];

// ============================================================
// REMOTE SENSING / NDVI DATA
// ============================================================
export const remoteSensingData = {
  lastUpdated: 'Sep 23, 2024 — 06:00 AM',
  source: 'Demo Visualization',
  isDemo: true,
  fields: [
    {
      id: 'field-a',
      name: 'Field A',
      crop: 'Bhindi',
      ndvi: 0.72,
      ndviStatus: 'Good Vegetation',
      waterStress: 'Low',
      growthStage: 'Vegetative',
      area: 5,
    },
    {
      id: 'field-b',
      name: 'Field B',
      crop: 'Aloo',
      ndvi: 0.58,
      ndviStatus: 'Moderate Vegetation',
      waterStress: 'Moderate',
      growthStage: 'Tuber Formation',
      area: 4,
    },
    {
      id: 'field-c',
      name: 'Field C',
      crop: 'Wheat',
      ndvi: 0.82,
      ndviStatus: 'Excellent Vegetation',
      waterStress: 'Low',
      growthStage: 'Sowing',
      area: 3,
    },
  ],
  vegetationTrend: [
    { date: 'Aug 24', fieldA: 0.45, fieldB: 0.38, fieldC: 0.5 },
    { date: 'Sep 1', fieldA: 0.55, fieldB: 0.48, fieldC: 0.6 },
    { date: 'Sep 8', fieldA: 0.62, fieldB: 0.52, fieldC: 0.7 },
    { date: 'Sep 15', fieldA: 0.68, fieldB: 0.56, fieldC: 0.78 },
    { date: 'Sep 22', fieldA: 0.72, fieldB: 0.58, fieldC: 0.82 },
  ],
};

// ============================================================
// DASHBOARD OVERVIEW CHARTS
// ============================================================
export const overviewChartData = {
  cropHealthTrend: [
    { month: 'Jul', value: 72 },
    { month: 'Aug', value: 68 },
    { month: 'Sep 1', value: 74 },
    { month: 'Sep 8', value: 76 },
    { month: 'Sep 15', value: 79 },
    { month: 'Sep 22', value: 82 },
    { month: 'Today', value: 82 },
  ],
  farmActivity: [
    { day: 'Mon', scans: 2, alerts: 1, ai: 3 },
    { day: 'Tue', scans: 1, alerts: 2, ai: 2 },
    { day: 'Wed', scans: 3, alerts: 0, ai: 4 },
    { day: 'Thu', scans: 2, alerts: 1, ai: 2 },
    { day: 'Fri', scans: 1, alerts: 3, ai: 1 },
    { day: 'Sat', scans: 0, alerts: 1, ai: 1 },
    { day: 'Sun', scans: 2, alerts: 0, ai: 2 },
  ],
};

// ============================================================
// CROP VISION ANALYSIS EXAMPLES
// ============================================================
export const cropVisionExamples = [
  {
    id: 'cv-1',
    crop: 'Bhindi (Okra)',
    image: null,
    status: 'Demo Analysis Complete',
    observation: 'Possible leaf yellowing detected',
    possibleIssue: 'Potential nutrient deficiency pattern',
    confidence: 'Demo Value',
    suggestions: [
      'Compare with field conditions in person',
      'Review soil nutrient readings',
      'Consult an agricultural expert',
      'Monitor affected leaves over 3-5 days',
    ],
  },
  {
    id: 'cv-2',
    crop: 'Tomato',
    image: null,
    status: 'Demo Analysis Complete',
    observation: 'Leaf discoloration pattern observed',
    possibleIssue: 'Illustrative: possible fungal pattern',
    confidence: 'Demo Value',
    suggestions: [
      'Physical inspection recommended',
      'Check for pest damage under leaves',
      'Review irrigation patterns',
      'Consult agricultural expert',
    ],
  },
];
