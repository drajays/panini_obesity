// PranaDaily Complete Structured Database of 150 Yoga Practices
// Fully mapped with instructions, benefits, and gorgeous Web Pictures

const YOGA_DATABASE = [
  // ==========================================
  // 1. WARMUP EXERCISES (30 items)
  // ==========================================
  {
    id: "wu-01",
    category: "warmup_exercises",
    title: "Neck Rolls",
    sanskrit: "Greeva Sanchalana",
    description: "Slow, gentle rotations of the head in clockwise and counter-clockwise circles to release cervical tension.",
    benefits: ["Releases neck stiffness", "Improves blood circulation to the brain", "Relieves stress and headaches"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-02",
    category: "warmup_exercises",
    title: "Shoulder Rolls",
    sanskrit: "Skandha Chakra",
    description: "Inhale while lifting shoulders up to your ears, then exhale as you roll them backward and down.",
    benefits: ["Relieves upper back and shoulder tension", "Improves posture", "Opens the chest"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-03",
    category: "warmup_exercises",
    title: "Arm Circles",
    sanskrit: "Bahu Chakra",
    description: "Extend both arms horizontally and make slow circular movements, expanding from small to wide circles.",
    benefits: ["Warms up the rotator cuff", "Enhances shoulder joint mobility", "Invigorates the upper body"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-04",
    category: "warmup_exercises",
    title: "Wrist Rotations",
    sanskrit: "Manibandha Chakra",
    description: "Make gentle fists with both hands and rotate your wrists slowly in clockwise and counter-clockwise directions.",
    benefits: ["Prevents repetitive strain injuries", "Excellent for desk workers", "Enhances nerve conduction in hands"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-05",
    category: "warmup_exercises",
    title: "Ankle Rotations",
    sanskrit: "Goolf Chakra",
    description: "Lift one foot slightly off the floor and rotate the foot from the ankle joint slowly and thoroughly.",
    benefits: ["Strengthens weak ankles", "Improves balance and proprioception", "Stimulates lower limb lymph drainage"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-06",
    category: "warmup_exercises",
    title: "Side-to-Side Neck Stretch",
    sanskrit: "Parshva Greeva Sanchalana",
    description: "Gently tilt your right ear toward your right shoulder, hold for 5 seconds, then switch to the left shoulder.",
    benefits: ["Lengthens the trapezius and sternocleidomastoid", "Calms the nervous system"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-07",
    category: "warmup_exercises",
    title: "Standing Side Stretch",
    sanskrit: "Tiryak Tadasana Prep",
    description: "Interlock your fingers above your head, stretch upward, and sway gently to the right and left like a bamboo tree.",
    benefits: ["Stretches intercostal muscles", "Opens up the ribcage for deeper breathing", "Trims waistline"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-08",
    category: "warmup_exercises",
    title: "Toe Touches",
    sanskrit: "Hastapadasana Warmup",
    description: "Stand tall, inhale deeply, and exhale as you fold forward from the hips to sweep your fingers toward your toes.",
    benefits: ["Warms up the hamstring and lumbar spine", "Encourages cerebral blood flow"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-09",
    category: "warmup_exercises",
    title: "Hip Circles",
    sanskrit: "Kati Chakra",
    description: "Place both hands on your hips and make wide circular rotations with your pelvis, keeping feet firmly planted.",
    benefits: ["Lubricates hip socket joints", "Loosens lower back stiffness", "Activates the sacral chakra"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-10",
    category: "warmup_exercises",
    title: "Leg Swings (front to back)",
    sanskrit: "Dynamic Utthita Hasta Padangusthasana",
    description: "Hold onto a wall or chair for stability and smoothly swing one leg forward and backward.",
    benefits: ["Increases hip flexor and hamstring flexibility", "Dynamic warmup for runners"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-11",
    category: "warmup_exercises",
    title: "Leg Swings (side to side)",
    sanskrit: "Dynamic Parshva Pada Sanchalana",
    description: "Face a wall, place both palms on it, and swing your right leg across the front of your body to the left and right.",
    benefits: ["Opens hip abductors and adductors", "Improves dynamic core stability"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-12",
    category: "warmup_exercises",
    title: "Marching in Place",
    sanskrit: "Tadasana Sanchalana",
    description: "Lift your knees rhythmically while standing in place, swinging your opposite arms actively.",
    benefits: ["Gently elevates heart rate", "Prepares the cardiovascular system for active yoga flows"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-13",
    category: "warmup_exercises",
    title: "High Knees (gentle)",
    sanskrit: "Utthita Janu Sanchalana",
    description: "A more active variation of marching where you bring your knees up toward your chest with intentional core activation.",
    benefits: ["Engages lower abdominals", "Improves balance and active hip flexion"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-14",
    category: "warmup_exercises",
    title: "Butt Kicks (gentle)",
    sanskrit: "Dynamic Bhekasana Prep",
    description: "Step from side to side while actively bending your knee backward to kick your heel toward your glutes.",
    benefits: ["Warms up quadriceps and knee joints", "Promotes agility"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-15",
    category: "warmup_exercises",
    title: "Standing Torso Twist",
    sanskrit: "Kati Chakrasana",
    description: "Stand with feet shoulder-width apart and swing your arms loosely to wrap around your torso as you twist left and right.",
    benefits: ["Decompresses spinal vertebrae", "Releases tension in mid-back", "Stimulates digestion"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-16",
    category: "warmup_exercises",
    title: "Forward Arm Swings",
    sanskrit: "Dynamic Bahu Prasarana",
    description: "Swing both arms simultaneously forward and overhead, then let them drop completely relaxed.",
    benefits: ["Opens the lung meridians", "Enhances vitality and deep oxygenation"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-17",
    category: "warmup_exercises",
    title: "Side Arm Swings",
    sanskrit: "Cross-Body Arm Swings",
    description: "Open your arms wide to the side, then cross them in front of your chest dynamically, alternating the top arm.",
    benefits: ["Stretches the chest pectorals and upper back rhomboids"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-18",
    category: "warmup_exercises",
    title: "Cat-Cow Pose",
    sanskrit: "Marjari-asana & Bitilasana",
    description: "From a tabletop position, inhale to arch your back and look up (Cow), then exhale to round your spine and tuck your chin (Cat).",
    benefits: ["Exceptional spinal mobility", "Coordinates breath with movement", "Gently massages abdominal organs"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-19",
    category: "warmup_exercises",
    title: "Child's Pose",
    sanskrit: "Balasana",
    description: "Kneel on the floor, bring your big toes together, sit back on your heels, and fold your torso forward, extending arms completely.",
    benefits: ["Deeply soothing restorative warmup", "Gently stretches lower back and hips"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-20",
    category: "warmup_exercises",
    title: "Seated Spinal Twist",
    sanskrit: "Parivrtta Sukhasana",
    description: "Sit cross-legged, place your right hand on your left knee and your left hand behind you. Inhale tall, exhale twist.",
    benefits: ["Rings out toxins from the liver and kidneys", "Keeps spinal discs healthy"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-21",
    category: "warmup_exercises",
    title: "Seated Forward Bend",
    sanskrit: "Paschimottanasana Warmup",
    description: "Extend both legs straight out in front, inhale your arms overhead, and gently fold forward over your thighs.",
    benefits: ["Stretches the entire posterior chain of the body", "Calms anxious thoughts"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-22",
    category: "warmup_exercises",
    title: "Seated Side Stretch",
    sanskrit: "Parshva Upavistha Konasana Prep",
    description: "Sit cross-legged, plant your right palm on the mat beside you, and reach your left arm up and over to the right.",
    benefits: ["Expands the lateral ribcage", "Relieves tight obliques and lats"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-23",
    category: "warmup_exercises",
    title: "Standing Quadriceps Stretch",
    sanskrit: "Eka Pada Tadasana Stretch",
    description: "Stand on one leg, catch your other foot behind your glutes with your hand, and keep your knees close together.",
    benefits: ["Releases tight quads and hip flexors", "Improves standing balance"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-24",
    category: "warmup_exercises",
    title: "Hamstring Stretch",
    sanskrit: "Ardha Hanumanasana Prep",
    description: "Extend one leg straight forward with your heel on the ground and toes flexed up. Hinge slightly at your hips.",
    benefits: ["Targeted hamstring release", "Relieves lower back pressure"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-25",
    category: "warmup_exercises",
    title: "Calf Stretch (standing)",
    sanskrit: "Parsvottanasana Prep",
    description: "Step one foot back, press your back heel firmly into the floor, and bend your front knee slightly.",
    benefits: ["Lengthens the gastrocnemius and soleus muscles", "Excellent for Achilles tendon health"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-26",
    category: "warmup_exercises",
    title: "Lunges (gentle)",
    sanskrit: "Ashwa Sanchalanasana Prep",
    description: "Step one foot forward and lower your back knee to hover or rest gently on the mat, sinking hips down.",
    benefits: ["Strengthens lower body", "Deeply opens the psoas muscle"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-27",
    category: "warmup_exercises",
    title: "Step Touch Side-to-Side",
    sanskrit: "Dynamic Agility Steps",
    description: "Lightly step your right foot to the side, tap your left foot next to it, then step back to the left.",
    benefits: ["Improves lateral coordination", "Warms up foot and ankle ligaments"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-28",
    category: "warmup_exercises",
    title: "Light Jumping Jacks",
    sanskrit: "Dynamic Urdhva Hasta Tadasana",
    description: "A low-impact or gentle jumping variation where arms sweep overhead as legs open wide.",
    benefits: ["Boosts metabolism", "Instant energy uplift and endorphin release"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-29",
    category: "warmup_exercises",
    title: "Light Jogging in Place",
    sanskrit: "Laghu Sanchalana",
    description: "Soft, bouncy jogging on the balls of your feet while staying absolutely centered in your space.",
    benefits: ["Clears mental fog", "Activates the lymphatic system"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wu-30",
    category: "warmup_exercises",
    title: "Dynamic Hamstring Sweep",
    sanskrit: "Hastapadasana Sweep",
    description: "Plant one heel forward, sweep both hands low to the floor past your heel, and inhale reach for the sky.",
    benefits: ["Combines deep leg stretching with invigorating chest expansion"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },

  // ==========================================
  // 2. SIMPLE ASANA (50 items)
  // ==========================================
  {
    id: "sa-01",
    category: "Simple Asana",
    title: "Bhujangasana (cobra pose)",
    sanskrit: "Bhujangasana",
    description: "Lie on your stomach, place palms under your shoulders, press the tops of your feet down, and lift your chest off the floor.",
    benefits: ["Strengthens the spine", "Stretches chest and lungs", "Firms the buttocks", "Relieves mild sciatica"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-02",
    category: "Simple Asana",
    title: "Tadasana (palm tree pose)",
    sanskrit: "Tadasana",
    description: "Stand tall with big toes touching, heels slightly apart. Interlock fingers, turn palms upward, and extend overhead while lifting onto tiptoes.",
    benefits: ["Improves posture and physical alignment", "Strengthens thighs, knees, and ankles", "Firms abdomen"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-03",
    category: "Simple Asana",
    title: "Trikonasana (triangle pose)",
    sanskrit: "Trikonasana",
    description: "Step feet wide, turn right foot out 90 degrees. Extend arms parallel to the floor, hinge at the right hip, and lower your right hand to your shin while reaching your left arm to the ceiling.",
    benefits: ["Stretches and strengthens thighs, knees, and ankles", "Stretches hips, groin, and hamstrings", "Stimulates abdominal organs"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-04",
    category: "Simple Asana",
    title: "Shashankasana (pose of the moon or hare pose)",
    sanskrit: "Shashankasana",
    description: "Sit in Vajrasana (on your heels). Inhale arms overhead, and exhale fold forward until your forehead touches the mat and hands rest completely relaxed.",
    benefits: ["Calms the mind and relieves anger", "Tones pelvic muscles", "Alleviates disorders of the reproductive organs"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-05",
    category: "Simple Asana",
    title: "Shavasana (corpse pose)",
    sanskrit: "Shavasana",
    description: "Lie flat on your back, legs slightly separated, arms at your sides with palms facing up. Close your eyes and breathe completely naturally.",
    benefits: ["Total nervous system relaxation", "Reduces blood pressure", "Deeply integrates all completed asanas"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-06",
    category: "Simple Asana",
    title: "Marjari-asana (cat stretch pose)",
    sanskrit: "Marjari-asana",
    description: "Come onto your hands and knees. Exhale thoroughly as you round your back toward the sky and tuck your chin firmly toward your chest.",
    benefits: ["Gently massages the spine and internal organs", "Releases upper back and shoulder knots"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-07",
    category: "Simple Asana",
    title: "Ushtrasana (camel pose)",
    sanskrit: "Ushtrasana",
    description: "Kneel with hips stacked over knees. Reach backward to hold your heels, pressing your hips forward and lifting your heart toward the ceiling.",
    benefits: ["Reduces fat on thighs", "Opens up the entire front of the body", "Improves spinal flexibility"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-08",
    category: "Simple Asana",
    title: "Dhanurasana (bow pose)",
    sanskrit: "Dhanurasana",
    description: "Lie on your belly, bend your knees, reach back to catch your ankles, and actively kick your legs back and up to lift your chest off the mat.",
    benefits: ["Strengthens the back muscles", "Stimulates the pancreas and adrenal glands", "Enhances spinal elasticity"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-09",
    category: "Simple Asana",
    title: "Gomukhasana (cow's face pose)",
    sanskrit: "Gomukhasana",
    description: "Cross your right knee exactly over your left knee while seated. Reach your right arm over your shoulder and left arm behind your back to clasp hands.",
    benefits: ["Deeply stretches shoulders, armpits, and triceps", "Opens tight hips and deep gluteal muscles"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-10",
    category: "Simple Asana",
    title: "Veerasana (hero's pose)",
    sanskrit: "Veerasana",
    description: "Kneel with your knees together and feet slightly wider than your hips. Sit straight down on the mat between your feet.",
    benefits: ["Stretches the thighs, knees, and ankles", "Improves digestion and relieves gas", "Great sitting posture for meditation"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-11",
    category: "Simple Asana",
    title: "Vajrasana (thunderbolt pose)",
    sanskrit: "Vajrasana",
    description: "Sit directly on your heels with your knees touching and big toes crossed. Keep your head, neck, and spine perfectly aligned.",
    benefits: ["The only asana that can be done immediately after meals", "Dramatically improves digestive fire", "Prevents ulcers"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-12",
    category: "Simple Asana",
    title: "Padmasana (lotus pose)",
    sanskrit: "Padmasana",
    description: "Sit with legs extended. Place your right foot firmly upon your left thigh, and then your left foot upon your right thigh, soles facing up.",
    benefits: ["The ultimate traditional posture for profound meditation", "Keeps the spine completely erect automatically"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-13",
    category: "Simple Asana",
    title: "Sukhasana (easy pose)",
    sanskrit: "Sukhasana",
    description: "A comfortable cross-legged seated position with both feet resting gently under the opposite knees. Hands rest in Jnana mudra.",
    benefits: ["Accessible to beginners", "Promotes inner tranquility and calm groundedness"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-14",
    category: "Simple Asana",
    title: "Halasana (plough pose)",
    sanskrit: "Halasana",
    description: "Lie flat on your back, lift both legs up 90 degrees, and then continue sweeping them over your head until your toes touch the floor behind you.",
    benefits: ["Stimulates the thyroid and parathyroid glands", "Provides a phenomenal stretch to the entire spine", "Improves sleep"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-15",
    category: "Simple Asana",
    title: "Ardha Matsyendrasana (half spinal twist pose)",
    sanskrit: "Ardha Matsyendrasana",
    description: "Sit with legs straight. Bend your right knee and step your right foot outside your left thigh. Twist your torso to the right, hooking your left elbow over your right knee.",
    benefits: ["Massages the abdominal organs and aids digestion", "Relieves lumbar pain and stiffness"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-16",
    category: "Simple Asana",
    title: "Paschimottanasana (seated forward bend)",
    sanskrit: "Paschimottanasana",
    description: "Sit tall with legs straight together. Inhale extend arms up, exhale fold forward from the hip joints to clasp your shins or feet.",
    benefits: ["Calms the brain and helps relieve stress and mild depression", "Tones shoulders and massages abdominal viscera"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-17",
    category: "Simple Asana",
    title: "Pavanamuktasana (wind-relieving pose)",
    sanskrit: "Pavanamuktasana",
    description: "Lie on your back, hug both knees firmly to your chest, interlock fingers around your shins, and lift your nose to touch your knees.",
    benefits: ["Highly effective for eliminating excessive digestive gas", "Relieves bloating and stubborn constipation"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-18",
    category: "Simple Asana",
    title: "Sarvangasana (shoulder stand)",
    sanskrit: "Sarvangasana",
    description: "Lie on your back, lift your legs, buttocks, and lower back off the floor, supporting your mid-back with your hands as you reach your toes to the ceiling.",
    benefits: ["Considered the 'Queen of all Asanas'", "Reverses gravity's pull to revitalize the circulatory and endocrine systems"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-19",
    category: "Simple Asana",
    title: "Matsyasana (fish pose)",
    sanskrit: "Matsyasana",
    description: "Lie on your back, place your hands under your glutes, press into your elbows to lift your chest high, and tilt the crown of your head to the floor.",
    benefits: ["Counter-pose for Sarvangasana", "Exceptional chest expander", "Stimulates deep thoracic breathing"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-20",
    category: "Simple Asana",
    title: "Vrikshasana (tree pose)",
    sanskrit: "Vrikshasana",
    description: "Stand tall. Place the sole of your right foot high on your left inner thigh (never on the knee joint). Bring hands to prayer at your heart or extend overhead.",
    benefits: ["Improves neuromuscular coordination", "Instills deep mental focus and quiet equilibrium"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-21",
    category: "Simple Asana",
    title: "Setu Bandhasana (bridge pose)",
    sanskrit: "Setu Bandhasana",
    description: "Lie on your back, bend your knees, plant feet hip-width apart. Press into your feet to lift your hips high, interlacing your fingers directly under your back.",
    benefits: ["Stretches the chest, neck, and spine", "Rejuvenates tired legs", "Excellent for relieving menstrual discomfort"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-22",
    category: "Simple Asana",
    title: "Balasana (child's pose)",
    sanskrit: "Balasana",
    description: "Kneel, spread your knees slightly, sit back fully onto your heels, and walk your fingertips completely forward to lengthen your sides.",
    benefits: ["Restores physical energy", "Releases deep compression in the lumbar discs"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-23",
    category: "Simple Asana",
    title: "Adho Mukha Svanasana (downward-facing dog pose)",
    sanskrit: "Adho Mukha Svanasana",
    description: "From tabletop, tuck your toes and lift your hips up and back to form an inverted 'V' shape. Press your palms firmly and reach your heels toward the floor.",
    benefits: ["Energizes the entire body", "Strengthens arms and shoulders", "Stretches calves, hamstrings, and foot arches"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-24",
    category: "Simple Asana",
    title: "Uttanasana (standing forward bend)",
    sanskrit: "Uttanasana",
    description: "Stand in Tadasana. Exhale as you fold forward entirely from your hip joints, keeping your legs active and letting your head hang loose.",
    benefits: ["Relieves insomnia and headaches", "Improves cellular oxygenation in the facial tissues"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-25",
    category: "Simple Asana",
    title: "Garudasana (eagle pose)",
    sanskrit: "Garudasana",
    description: "Stand on your left foot, cross your right thigh over your left, and tuck your right foot behind your left calf. Cross your left arm over your right elbow and bring palms together.",
    benefits: ["Strengthens and stretches ankles and calves", "Improves deep physical concentration"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-26",
    category: "Simple Asana",
    title: "Baddha Konasana (bound angle pose)",
    sanskrit: "Baddha Konasana",
    description: "Sit tall, bring the soles of your feet together, draw your heels as close to your pelvis as possible, and let your knees flutter gently down toward the floor.",
    benefits: ["Stimulates the heart and improves general circulation", "Highly soothing for pregnant women"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-27",
    category: "Simple Asana",
    title: "Navasana (boat pose)",
    sanskrit: "Paripurna Navasana",
    description: "Sit with knees bent. Lean slightly back, balance entirely on your sit bones, and lift your feet off the floor to straighten your legs into a 'V' shape, arms perfectly parallel to the mat.",
    benefits: ["Firms the core and rectus abdominis", "Strengthens hip flexors and deep vertebral muscles"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-28",
    category: "Simple Asana",
    title: "Ardha Chakrasana (half wheel pose)",
    sanskrit: "Ardha Chakrasana",
    description: "Stand tall, support your lower back with both palms, inhale deeply as you tilt your head backward and arch your upper torso gracefully backward.",
    benefits: ["Expands the chest capacity", "Relieves neck and shoulder slumping caused by sedentary work"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-29",
    category: "Simple Asana",
    title: "Kumbhakasana (plank pose)",
    sanskrit: "Phalakasana / Kumbhakasana",
    description: "Plant both palms firmly under your shoulders and step both feet straight back, maintaining your entire body in one rigid, straight, powerful line.",
    benefits: ["Builds immense upper body endurance", "Tones the entire core belt and glutes"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-30",
    category: "Simple Asana",
    title: "Parvatasana (mountain pose)",
    sanskrit: "Parvatasana",
    description: "While seated in Padmasana or Vajrasana, interlock your fingers, invert your palms, and stretch both arms straight upward high above your head.",
    benefits: ["Corrects postural defects of the spine", "Opens tight armpits and creates space in the ribcage"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-31",
    category: "Simple Asana",
    title: "Parighasana (gate pose)",
    sanskrit: "Parighasana",
    description: "Kneel on your mat, extend your right leg perfectly straight to the right side, and arc your left arm overhead to stretch deeply toward your extended toes.",
    benefits: ["Improves lateral lung capacity", "Stretches deep abdominal and intercostal side tissues"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-32",
    category: "Simple Asana",
    title: "Simhasana (lion pose)",
    sanskrit: "Simhasana",
    description: "Kneel down, cross your ankles under you, spread your palms on your knees. Inhale deeply, then exhale forcefully through your mouth while sticking your tongue out completely and gazing at your third eye.",
    benefits: ["Excellent for throat health and vocal cords", "Relieves jaw tension and eliminates facial stress"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-33",
    category: "Simple Asana",
    title: "Anjaneyasana (low lunge pose)",
    sanskrit: "Anjaneyasana",
    description: "From downward dog, step one foot forward between your hands, drop your back knee to the mat, sink your pelvis low, and sweep your arms overhead in a slight backbend.",
    benefits: ["Releases emotional tension stored in the psoas", "Improves balance and opens the spiritual heart"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-34",
    category: "Simple Asana",
    title: "Chaturanga Dandasana (four-limbed staff pose)",
    sanskrit: "Chaturanga Dandasana",
    description: "From high plank, shift your shoulders slightly forward and lower your rigid body until your elbows form an exact 90-degree angle, hovering directly off the floor.",
    benefits: ["Develops powerful triceps and chest stabilizers", "Prepares the body for advanced arm balances"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-35",
    category: "Simple Asana",
    title: "Dandasana (staff pose)",
    sanskrit: "Dandasana",
    description: "Sit firmly on the floor with your legs straight out in front and feet flexed. Press your palms into the floor directly beside your hips to lift your chest high.",
    benefits: ["Cultivates proper postural awareness for all seated yoga poses", "Strengthens deep back extensor muscles"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-36",
    category: "Simple Asana",
    title: "Utthita Trikonasana (extended triangle pose)",
    sanskrit: "Utthita Trikonasana",
    description: "A wider, deeply engaged variation of Trikonasana where the bottom hand rests outside the foot or on a block to create an expansive diagonal stretch.",
    benefits: ["Improves overall stability and balance", "Tones the lateral side waistline completely"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-37",
    category: "Simple Asana",
    title: "Virabhadrasana I (warrior I pose)",
    sanskrit: "Virabhadrasana I",
    description: "Step one foot back 4-5 feet and turn it out 45 degrees. Bend your front knee exactly over your ankle, square your hips to the front, and reach your arms straight to the sky.",
    benefits: ["Builds solid strength in the entire lower body", "Develops deep focus, courage, and stamina"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-38",
    category: "Simple Asana",
    title: "Virabhadrasana II (warrior II pose)",
    sanskrit: "Virabhadrasana II",
    description: "Step feet wide, turn your right foot exactly out 90 degrees. Bend your right knee over your ankle, open your torso to the side, and extend arms parallel to the floor, gazing fiercely over your right fingertips.",
    benefits: ["Exceptional hip and groin opener", "Increases circulation and relieves backaches"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-39",
    category: "Simple Asana",
    title: "Virabhadrasana III (warrior III pose)",
    sanskrit: "Virabhadrasana III",
    description: "From Warrior I, shift your entire weight into your front foot, lift your back leg perfectly parallel to the floor, and reach both arms straight forward to create a capital 'T' shape.",
    benefits: ["Enhances core proprioception and standing balance", "Strengthens standing ankles and deep gluteal stabilizers"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-40",
    category: "Simple Asana",
    title: "Utkatasana (chair pose)",
    sanskrit: "Utkatasana",
    description: "Stand with feet touching. Inhale reach your arms straight overhead, then exhale as you bend your knees and sink your hips down and back as if sitting in an imaginary chair.",
    benefits: ["Tones the quadriceps, calves, and Achilles tendons", "Stimulates the physical heart and diaphragm"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-41",
    category: "Simple Asana",
    title: "Ardha Uttanasana (half forward bend)",
    sanskrit: "Ardha Uttanasana",
    description: "From a full forward fold, press your palms into your shins, lift your torso halfway up to form a perfectly flat back, and extend through the crown of your head.",
    benefits: ["Strengthens the erector spinae muscles", "Creates magnificent spinal extension"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-42",
    category: "Simple Asana",
    title: "Malasana (garland pose)",
    sanskrit: "Malasana",
    description: "Step your feet slightly wider than your hips with toes turned out. Sink completely down into a deep squat, pressing your elbows firmly against your inner knees with palms in prayer.",
    benefits: ["Keeps hip joints extraordinarily youthful and agile", "Highly effective for pelvic floor health"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-43",
    category: "Simple Asana",
    title: "Utthan Pristhasana (lizard pose)",
    sanskrit: "Utthan Pristhasana",
    description: "From low lunge, bring both arms to the inside of your front foot, lower your forearms down onto the mat or a block, and lengthen your back leg.",
    benefits: ["Intense deep hip and hamstring opener", "Releases deep structural emotional tension"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-44",
    category: "Simple Asana",
    title: "Supta Baddha Konasana (reclined bound angle pose)",
    sanskrit: "Supta Baddha Konasana",
    description: "Lie entirely flat on your back, bring the soles of your feet together, and let your knees surrender gently out to the sides. Rest one hand on your belly and one on your heart.",
    benefits: ["One of the most restorative nervous system tonics", "Relieves menstrual pain and digestive stress"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-45",
    category: "Simple Asana",
    title: "Mandukasana (frog pose)",
    sanskrit: "Mandukasana",
    description: "Kneel down in Vajrasana. Make fists with both hands, place them firmly on either side of your navel, and exhale as you fold your chest forward over your thighs.",
    benefits: ["Exceptional for managing healthy blood sugar levels", "Directly massages the pancreas and liver"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-46",
    category: "Simple Asana",
    title: "Bharmanasana (tabletop pose)",
    sanskrit: "Bharmanasana",
    description: "Come onto all fours with your wrists perfectly aligned directly under your shoulders and your knees exactly under your hips, back completely neutral.",
    benefits: ["The foundational starting posture for all floor balances", "Enhances spinal alignment awareness"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-47",
    category: "Simple Asana",
    title: "Eka Pada Rajakapotasana (pigeon pose)",
    sanskrit: "Eka Pada Rajakapotasana",
    description: "Bring your right shin forward on the mat parallel to the top edge, slide your left leg fully back, square your hips, and fold your torso down over your front leg.",
    benefits: ["Provides a magnificent stretch to the piriformis and glutes", "Relieves chronic lower back aches"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-48",
    category: "Simple Asana",
    title: "Parivrtta Trikonasana (revolved triangle pose)",
    sanskrit: "Parivrtta Trikonasana",
    description: "Step feet wide, square your hips to the right foot. Inhale your left arm up, hinge forward, and place your left hand outside your right foot while twisting your right arm to the sky.",
    benefits: ["Stimulates deep detoxification of the abdominal organs", "Increases spinal rotation elasticity"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-49",
    category: "Simple Asana",
    title: "Ashwa Sanchalanasana (equestrian pose)",
    sanskrit: "Ashwa Sanchalanasana",
    description: "A powerful low lunge variation where the fingertips remain firmly planted on the floor beside the front foot as the chest lifts proudly forward and up.",
    benefits: ["Stretches the quadriceps and psoas", "Key component of Surya Namaskar"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sa-50",
    category: "Simple Asana",
    title: "Shirshasana (headstand)",
    sanskrit: "Salamba Shirshasana Prep",
    description: "Interlace your fingers, place your forearms on the mat, cradle the crown of your head, walk your tiptoes close, and lift your hips high. (Perform against a wall if a beginner).",
    benefits: ["Known as the 'King of all Asanas'", "Brings pure oxygenated blood to the brain cells", "Improves memory"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },

  // ==========================================
  // 3. SURYANAMASKAR VARIANTS (20 items)
  // ==========================================
  {
    id: "sn-01",
    category: "suryanamaskar_variants",
    title: "Traditional Surya Namaskar (Classical Hatha Yoga)",
    sanskrit: "Surya Namaskar",
    description: "The time-honored 12-step sequence linking Pranamasana, Hastauttanasana, Hastapadasana, Ashwa Sanchalanasana, Parvatasana, Ashtanga Namaskara, and Bhujangasana.",
    benefits: ["Brings total harmony to the body, breath, and mind", "Exceptional cardiovascular workout"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-02",
    category: "suryanamaskar_variants",
    title: "Surya Namaskar A (Ashtanga Yoga)",
    sanskrit: "Surya Namaskar A",
    description: "The dynamic 9-vinyasa flow starting every Ashtanga practice, flowing through Chaturanga, Upward-Facing Dog, and holding Downward-Facing Dog for 5 deep breaths.",
    benefits: ["Ignites tremendous internal physical heat", "Purifies the bloodstream with synchronized Ujjayi breath"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-03",
    category: "suryanamaskar_variants",
    title: "Surya Namaskar B (Ashtanga Yoga)",
    sanskrit: "Surya Namaskar B",
    description: "A more rigorous 17-vinyasa sequence incorporating Utkatasana (Chair pose) and Virabhadrasana I (Warrior I) on both sides.",
    benefits: ["Builds extraordinary leg stamina", "Strengthens the cardiovascular and respiratory systems"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-04",
    category: "suryanamaskar_variants",
    title: "Iyengar Style Surya Namaskar",
    sanskrit: "Iyengar Surya Namaskar",
    description: "A precision-focused salutation where each transition is executed with flawless anatomical alignment, often utilizing wooden blocks for precise support.",
    benefits: ["Guarantees impeccable posture and joint safety", "Develops deep physical mindfulness"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-05",
    category: "suryanamaskar_variants",
    title: "Sivananda Style Surya Namaskar",
    sanskrit: "Sivananda Surya Namaskar",
    description: "A highly meditative 12-step rhythm practiced gracefully with specific solar mantra recitations for each distinct position.",
    benefits: ["Awakens the 12 solar energy centers in the aura", "Infuses the subtle body with spiritual light"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-06",
    category: "suryanamaskar_variants",
    title: "Kriya Yoga Surya Namaskar",
    sanskrit: "Kriya Surya Namaskar",
    description: "Practiced with powerful internal psychic energy locks (bandhas) and conscious movement of awareness up and down the astral spine.",
    benefits: ["Accelerates human spiritual evolution", "Awakens dormant kundalini energy"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-07",
    category: "suryanamaskar_variants",
    title: "Dynamic Surya Namaskar",
    sanskrit: "Tej Surya Namaskar",
    description: "Practiced at an accelerated, continuous pace with zero pauses, turning the sequence into a phenomenal aerobic fat-burning routine.",
    benefits: ["Excellent for natural weight loss", "Flushes toxins through intense perspiration"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-08",
    category: "suryanamaskar_variants",
    title: "Chandra Namaskar (Moon Salutation)",
    sanskrit: "Chandra Namaskar",
    description: "A cooling, side-to-side soothing lateral flow practiced in the evening, featuring Utkata Konasana (Goddess pose) and gentle crescent lunges.",
    benefits: ["Balances excessive solar pitta energy", "Cultivates intuitive, calm feminine energy"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-09",
    category: "suryanamaskar_variants",
    title: "Vinyasa Flow Surya Namaskar",
    sanskrit: "Vinyasa Surya Flow",
    description: "A highly creative, fluid salutation where wild variations like three-legged dog, wild thing, and high lunges are seamlessly danced into the flow.",
    benefits: ["Encourages deep personal somatic expression", "Enhances agility and total body grace"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-10",
    category: "suryanamaskar_variants",
    title: "Power Yoga Surya Namaskar",
    sanskrit: "Shakti Surya Namaskar",
    description: "A modern athletic interpretation incorporating explosive jump-backs, push-up variations, and active static core holds.",
    benefits: ["Builds spectacular lean muscle mass", "Unlocks absolute physical strength"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-11",
    category: "suryanamaskar_variants",
    title: "Slow-Paced Surya Namaskar (Restorative)",
    sanskrit: "Shanti Surya Namaskar",
    description: "Holding each constituent position of the salutation for 1-2 minutes with eyes closed and deep, unhurried belly breathing.",
    benefits: ["Releases chronic deep myofascial tightness", "Wonderful for recovery days"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-12",
    category: "suryanamaskar_variants",
    title: "Chair Surya Namaskar (Seated Variation)",
    sanskrit: "Asana Asandi Surya Namaskar",
    description: "A fully accessible sequence executed entirely while seated securely in a stable chair, incorporating seated arches, folds, and arm twists.",
    benefits: ["100% accessible for seniors and desk workers", "Keeps the spine vital without floor strain"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-13",
    category: "suryanamaskar_variants",
    title: "Pregnancy-Friendly Surya Namaskar (Modified)",
    sanskrit: "Garbhini Surya Namaskar",
    description: "A highly specialized gentle adaptation using wide leg stances to create ample room for the growing belly, replacing belly-down poses with Cat-Cow.",
    benefits: ["Prepares the pelvic floor for a smooth delivery", "Relieves pregnancy back fatigue"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-14",
    category: "suryanamaskar_variants",
    title: "Aerial Yoga Surya Namaskar",
    sanskrit: "Antariksha Surya Namaskar",
    description: "Using a suspended silk hammock to support the pelvis and shoulders, allowing for breathtaking zero-gravity spinal decompression during the salutation.",
    benefits: ["Flawless spinal traction", "Builds phenomenal aerial spatial awareness"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-15",
    category: "suryanamaskar_variants",
    title: "Standing Surya Namaskar (Without Floor Poses)",
    sanskrit: "Utthita Surya Namaskar",
    description: "A fantastic continuous standing cycle integrating overhead stretches, side bends, and high standing lunges without ever touching the floor.",
    benefits: ["Perfect for outdoor practice without a yoga mat", "Excellent for individuals with delicate wrists"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-16",
    category: "suryanamaskar_variants",
    title: "Tantric Surya Namaskar",
    sanskrit: "Tantra Surya Namaskar",
    description: "A highly esoteric salutation involving specific geometry visualization and concentration on the descending golden rays of the solar logos.",
    benefits: ["Awakens high psychic perception", "Unites solar and lunar polarities within the brain"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-17",
    category: "suryanamaskar_variants",
    title: "Bhakti Flow Surya Namaskar (Devotional)",
    sanskrit: "Bhakti Surya Namaskar",
    description: "Practiced with pure unconditional love and gratitude in the heart, treating the physical movements as an offering of devotion to the universe.",
    benefits: ["Opens the Anahata heart chakra completely", "Transforms physical exercise into pure sublime joy"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-18",
    category: "suryanamaskar_variants",
    title: "Lunar-Integrated Surya Namaskar (Blend with Chandra Namaskar)",
    sanskrit: "Surya-Chandra Namaskar",
    description: "A spectacular harmonizing flow that alternates one complete solar round with one complete lunar round, embodying the true Hatha meaning (Ha=Sun, Tha=Moon).",
    benefits: ["The absolute zenith of internal physical and energetic equilibrium"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-19",
    category: "suryanamaskar_variants",
    title: "Kids-Friendly Surya Namaskar (Simplified Version)",
    sanskrit: "Bala Surya Namaskar",
    description: "A delightful, playful 6-step adaptation using fun animal names like 'Proud Lion', 'Tall Giraffe', and 'Happy Dog' to keep children excited.",
    benefits: ["Improves focus and attention span in growing kids", "Builds lifelong healthy posture habits"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sn-20",
    category: "suryanamaskar_variants",
    title: "Therapeutic Surya Namaskar (Gentle Movements)",
    sanskrit: "Chikitsa Surya Namaskar",
    description: "A clinic-designed gentle sequence executed with micro-movements to rehabilitate spinal injuries and restore gentle flexibility.",
    benefits: ["Superb for physical rehabilitation", "Provides completely pain-free joint lubrication"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },

  // ==========================================
  // 4. ADVANCED ASANA (10 items)
  // ==========================================
  {
    id: "aa-01",
    category: "Advanced Asana",
    title: "Vrischikasana (scorpion pose)",
    sanskrit: "Vrischikasana",
    description: "From a stable forearm stand (Pincha Mayurasana), deeply arch your back, bend your knees, and gracefully lower your toes toward the crown of your head.",
    benefits: ["Requires and develops elite upper body strength", "Creates phenomenal spinal elasticity", "Mastery of physical balance"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-02",
    category: "Advanced Asana",
    title: "Eka Pada Sirasana (one foot to head pose)",
    sanskrit: "Eka Pada Sirasana",
    description: "While seated, take your right foot and carefully work your calf and shin up and over your right shoulder until your foot rests securely behind your neck.",
    benefits: ["Unlocks extreme hip and hamstring mobility", "Intensely stimulates the digestive organs"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-03",
    category: "Advanced Asana",
    title: "Mayurasana (peacock pose)",
    sanskrit: "Mayurasana",
    description: "Kneel down, bring both elbows together, press them firmly into your navel, plant your palms backward, and lean forward to balance your rigid, straight body completely off the floor.",
    benefits: ["One of the most potent detoxifying asanas known", "Destroys digestive toxins and sluggishness", "Improves wrist strength"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-04",
    category: "Advanced Asana",
    title: "Padma Mayurasana (lotus or bound peacock pose)",
    sanskrit: "Padma Mayurasana",
    description: "Perform the intense Peacock arm balance while your legs are securely locked into Padmasana (Lotus pose).",
    benefits: ["Provides exceptional internal visceral massage", "Develops peerless mental determination"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-05",
    category: "Advanced Asana",
    title: "Natarajasana (Lord Shiva's pose)",
    sanskrit: "Natarajasana",
    description: "Stand on one leg, catch your back foot with an overhead flipped grip, arch your spine beautifully, and reach your other arm straight forward.",
    benefits: ["Epitomizes physical poise, grace, and balance", "Exceptional shoulder and chest expander"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-06",
    category: "Advanced Asana",
    title: "Vipareeta Karani Asana (inverted pose)",
    sanskrit: "Vipareeta Karani",
    description: "A highly restorative gentle inversion where the hips are supported by the hands or a bolster while the legs extend upward or rest flat against a solid wall.",
    benefits: ["Phenomenal relief for tired, swollen legs and varicose veins", "Deeply rejuvenates the nervous system"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-07",
    category: "Advanced Asana",
    title: "Halasana (plough pose)",
    sanskrit: "Halasana (Advanced Hold)",
    description: "An advanced execution of Halasana where the hands are interlaced straight behind the back and held for up to 5 full minutes of deep thyroid compression.",
    benefits: ["Superb metabolic regulator", "Eliminates chronic fatigue and insomnia entirely"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-08",
    category: "Advanced Asana",
    title: "Sirshasana (headstand pose)",
    sanskrit: "Salamba Sirshasana",
    description: "An independent freestanding headstand held with flawless structural verticality, calm breath, and absolute stillness.",
    benefits: ["Brings supreme mental clarity and emotional calmness", "Stimulates the crown Sahasrara chakra"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-09",
    category: "Advanced Asana",
    title: "Poorna Chakrasana (full wheel pose)",
    sanskrit: "Urdhva Dhanurasana / Poorna Chakrasana",
    description: "Lie on your back, plant palms beside your ears, press powerfully into your feet and hands to lift your entire body into an extraordinary deep wheel backbend.",
    benefits: ["Unlocks tremendous surges of physical and emotional energy", "Strengthens arms, glutes, and back"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "aa-10",
    category: "Advanced Asana",
    title: "Dwi Pada Sirasana (two feet to head pose)",
    sanskrit: "Dwi Pada Sirasana",
    description: "An elite balancing posture where both legs are worked behind the neck and shoulders while the hands balance the entire body weight off the mat.",
    benefits: ["The ultimate mastery of hip flexibility and internal abdominal focus"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },

  // ==========================================
  // 5. PRANAYAM & DHYANA (12 items)
  // ==========================================
  {
    id: "pd-01",
    category: "Pranayam & Dhyana",
    title: "Bhastrika Pranayama (bellows breath)",
    sanskrit: "Bhastrika",
    description: "Sit in Padmasana. Execute rapid, forceful active inhalations and exhalations using your diaphragm like a blacksmith's bellows.",
    benefits: ["Supercharges the blood with oxygen", "Heats the internal body", "Burns up persistent phlegm and toxins"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-02",
    category: "Pranayam & Dhyana",
    title: "Bhramari Pranayama (humming bee breath)",
    sanskrit: "Bhramari",
    description: "Gently plug your ears with your thumbs, rest your fingers over your closed eyes, inhale deeply, and exhale producing a smooth, continuous humming bee sound.",
    benefits: ["Instantaneous remedy for anxiety and anger", "Vibrates and soothes the pituitary gland", "Promotes blissful sleep"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-03",
    category: "Pranayam & Dhyana",
    title: "Nadi Shodhana Pranayama (psychic network purification)",
    sanskrit: "Nadi Shodhana",
    description: "Alternate nostril breathing with specific breath retention ratios (e.g. 1:4:2) to completely clean the Ida and Pingala subtle energy tubes.",
    benefits: ["Brings perfect balance to the left and right hemispheres of the brain", "Deeply tranquilizes the nervous system"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-04",
    category: "Pranayam & Dhyana",
    title: "Ujjayi Pranayama (the psychic breath)",
    sanskrit: "Ujjayi",
    description: "Slightly constrict the back of your throat while inhaling and exhaling through your nose, producing a gentle, soothing ocean wave sound.",
    benefits: ["Calms the mind instantly", "Slows down an excessively high heart rate", "Builds deep internal concentration"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-05",
    category: "Pranayam & Dhyana",
    title: "Sheetali Pranayama (cooling breath)",
    sanskrit: "Sheetali",
    description: "Roll your tongue into a straw shape, inhale the cool air through the tube, close your mouth, and exhale slowly through your nostrils.",
    benefits: ["Instantly cools the physical body during hot summer days", "Quenches thirst and lowers fever"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-06",
    category: "Pranayam & Dhyana",
    title: "Seetkari Pranayama (hissing breath)",
    sanskrit: "Seetkari",
    description: "Bring your teeth together slightly, open your lips, inhale deeply through your teeth to make a gentle hissing sound, then exhale through the nose.",
    benefits: ["Keeps teeth and gums highly vital", "Cools hot temperaments and alleviates high blood pressure"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-07",
    category: "Pranayam & Dhyana",
    title: "Maha Mudra (great psychic attitude)",
    sanskrit: "Maha Mudra",
    description: "Sit with one leg extended and one heel pressed firmly into the perineum. Catch your extended big toe, hold your breath in, and execute all three internal locks (Bandhas).",
    benefits: ["Clears mental depression and sluggishness", "Directs pranic vitality straight into the central Sushumna channel"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-08",
    category: "Pranayam & Dhyana",
    title: "Yoga Mudra (attitude of psychic union)",
    sanskrit: "Yoga Mudra Dhyana",
    description: "Sit in Padmasana. Hold one wrist behind your back, exhale completely as you fold forward to touch your forehead to the floor in deep surrender.",
    benefits: ["Unlocks sublime inner peace", "Stretches the lumbar spine and massages internal abdominal organs"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-09",
    category: "Pranayam & Dhyana",
    title: "Yoni Mudra (attitude of the womb or source)",
    sanskrit: "Shanmukhi / Yoni Mudra",
    description: "Close all the sensory gates of the head (ears, eyes, nose, lips) with your clean fingers, directing 100% of your consciousness completely inward.",
    benefits: ["Awakens profound inner mystical visions", "Completely silences all external environmental distractions"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-10",
    category: "Pranayam & Dhyana",
    title: "Kapalabhati Pranayama (shining skull breath)",
    sanskrit: "Kapalabhati",
    description: "Execute rapid, active, rhythmic, snapping exhalations entirely by pumping your lower abdominal muscles inward, allowing inhalations to happen passively.",
    benefits: ["Purifies the frontal lobes of the brain", "Improves skin luster and gives a legendary glowing face", "Trims belly fat"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-11",
    category: "Pranayam & Dhyana",
    title: "Anulom Vilom Pranayama (alternate nostril breathing)",
    sanskrit: "Anulom Vilom",
    description: "Simple, continuous alternate nostril breathing without holding the breath, breathing gracefully in left, out right, in right, out left.",
    benefits: ["One of the finest everyday mindfulness practices", "Normalizes blood pressure", "Relieves everyday stress"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pd-12",
    category: "Pranayam & Dhyana",
    title: "Surya Bhedana Pranayama (sun-piercing breath)",
    sanskrit: "Surya Bhedana",
    description: "Inhale exclusively through the right (solar) nostril, hold the breath briefly, and exhale completely through the left nostril.",
    benefits: ["Increases dynamic physical energy and internal heat", "Stimulates an underactive sympathetic nervous system"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },

  // ==========================================
  // 6. SITTING POSTURES (9 items)
  // ==========================================
  {
    id: "sp-01",
    category: "Sitting Postures",
    title: "Padmasana (lotus pose)",
    sanskrit: "Padmasana",
    description: "The classic posture of absolute symmetry where both feet rest crossed securely upon the opposite upper thighs.",
    benefits: ["Locks the physical body into pure stillness for hours of uninterrupted Dhyana"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sp-02",
    category: "Sitting Postures",
    title: "Siddhasana (accomplished pose for men)",
    sanskrit: "Siddhasana",
    description: "Sit with one heel pressed firmly into the perineum and the top foot tucked smoothly between the opposite calf and thigh.",
    benefits: ["Highly revered by accomplished yogis for directly sublimating sexual energy into pure spiritual awareness"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sp-03",
    category: "Sitting Postures",
    title: "Swastikasana (auspicious pose)",
    sanskrit: "Swastikasana",
    description: "A beautifully balanced cross-legged seated position where the toes of both feet are tucked neatly into the folds of the opposite knee joints.",
    benefits: ["A very stable, comfortable posture that requires less knee flexibility than full Lotus"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sp-04",
    category: "Sitting Postures",
    title: "Gupta Padmasana (hidden lotus pose)",
    sanskrit: "Gupta Padmasana",
    description: "From Lotus pose, roll forward onto your belly and rest your chin or cheek on your mat with hands resting on your back.",
    benefits: ["Provides exceptional postural balance", "Relieves deep lower back compression"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sp-05",
    category: "Sitting Postures",
    title: "Ardha Padmasana (half lotus pose)",
    sanskrit: "Ardha Padmasana",
    description: "Sit with one foot resting comfortably on top of the opposite thigh while the other foot is tucked underneath.",
    benefits: ["Excellent transitional sitting posture to prepare tight knees for full Lotus mastery"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sp-06",
    category: "Sitting Postures",
    title: "Bhadrasana (gracious pose)",
    sanskrit: "Bhadrasana",
    description: "Sit in Vajrasana, separate your knees as wide as possible while keeping your big toes touching behind you, and rest your palms on your knees.",
    benefits: ["Superb for pelvic organ health", "Relieves sciatica and supports pregnancy wellness"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sp-07",
    category: "Sitting Postures",
    title: "Sahajoli Mudra (spontaneous psychic attitude)",
    sanskrit: "Sahajoli Sitting Prep",
    description: "A specialized meditative sitting position executed with subtle active awareness and contraction of the lower urinary tract system.",
    benefits: ["Regulates the urogenital system", "Conserves vital human prana"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sp-08",
    category: "Sitting Postures",
    title: "Dhyana Veerasana (hero's meditation pose)",
    sanskrit: "Dhyana Veerasana",
    description: "Sit on one heel while the other knee is raised directly in front of your chest, resting your elbows peacefully on your raised knee.",
    benefits: ["Cultivates profound mental steadfastness and unshakeable heroic focus"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sp-09",
    category: "Sitting Postures",
    title: "Moolabandhasana (perineal contraction pose)",
    sanskrit: "Moolabandhasana",
    description: "Sit tall and bring the soles of your feet together in front of your pelvis, pressing your heels directly and firmly against the perineum.",
    benefits: ["Completely seals and activates Moola Bandha automatically", "Awakens the root Muladhara chakra"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },

  // ==========================================
  // 7. MUDRA (7 items)
  // ==========================================
  {
    id: "mu-01",
    category: "Mudra",
    title: "Chin Mudra (psychic gesture of consciousness)",
    sanskrit: "Chin Mudra",
    description: "Bring the tips of your thumb and index finger together to form a flawless circle. Extend the remaining three fingers straight, resting palms down on your knees.",
    benefits: ["Connects individual consciousness with universal awareness", "Grounds the mind during Pranayam"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mu-02",
    category: "Mudra",
    title: "Jnana Mudra (psychic gesture of knowledge)",
    sanskrit: "Jnana Mudra",
    description: "Identical execution to Chin Mudra, but the palms are turned upwards toward the ceiling to receive cosmic inspiration.",
    benefits: ["Enhances intellectual receptivity", "Relieves insomnia and brightens mood"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mu-03",
    category: "Mudra",
    title: "Hridaya Mudra (heart gesture)",
    sanskrit: "Hridaya Mudra",
    description: "Curl your index finger down to the base of your thumb. Bring the tips of your middle, ring, and thumb fingers together, keeping the little finger extended.",
    benefits: ["Regulates the physical heart", "Releases pent-up emotional heartache and promotes deep compassion"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mu-04",
    category: "Mudra",
    title: "Shambhavi Mudra (eyebrow centre gazing)",
    sanskrit: "Shambhavi Mudra",
    description: "Hold your head perfectly steady and gently gaze upward with your eyes to fix your visual concentration precisely at the spot between your eyebrows.",
    benefits: ["Considered one of the highest psychic techniques", "Stimulates the third eye Ajna chakra", "Brings instant mental silence"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mu-05",
    category: "Mudra",
    title: "Nasagra Mudra (nosetip position)",
    sanskrit: "Agochari / Nasagra Mudra",
    description: "Gently cross your eyes to focus your visual concentration entirely and clearly upon the very tip of your physical nose.",
    benefits: ["Builds spectacular one-pointed concentration", "Balances the subtle olfactory meridians"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mu-06",
    category: "Mudra",
    title: "Hamsa Mudra (attitude of the swan)",
    sanskrit: "Hamsa Mudra",
    description: "Bring the tips of all four fingers together to touch the tip of your extended thumb, resembling the elegant beak of a divine swan.",
    benefits: ["Stimulates universal discernment and purity of spirit", "Harmonizes all five elemental energies in the body"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mu-07",
    category: "Mudra",
    title: "Yoni Mudra (attitude of the womb or source)",
    sanskrit: "Yoni Mudra Variation",
    description: "Interlock your middle, ring, and little fingers inside your palms. Press the pads of your thumbs together and extend your index fingers straight to form a downward triangle.",
    benefits: ["Enhances calm feminine intuition", "Awakens the primal life force stored in the sacral bowl"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },

  // ==========================================
  // 8. BANDHA (5 items)
  // ==========================================
  {
    id: "ba-01",
    category: "Bandha",
    title: "Moola Bandha (perineum contraction)",
    sanskrit: "Moola Bandha",
    description: "Consciously contract and pull upward the specific pelvic floor muscles located directly at the perineum.",
    benefits: ["Prevents vital pranic energy from leaking downward", "Strengthens pelvic internal organs and heals hemorrhoids"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ba-02",
    category: "Bandha",
    title: "Uddiyana Bandha (abdominal contraction)",
    sanskrit: "Uddiyana Bandha",
    description: "Exhale your breath completely out. While holding the breath out, perform a mock inhalation to suck your diaphragm and entire abdomen up and deep into your ribcage.",
    benefits: ["Provides a magnificent internal massage to all abdominal organs", "Ignites the digestive fire (Manipura chakra)"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ba-03",
    category: "Bandha",
    title: "Jalandhara Bandha (throat lock)",
    sanskrit: "Jalandhara Bandha",
    description: "Inhale fully. Lift your sternum proudly upward and firmly bring your chin down to lock exactly into the notch between your collarbones.",
    benefits: ["Completely regulates the thyroid and parathyroid glands", "Prevents prana from rushing wildly into the head"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ba-04",
    category: "Bandha",
    title: "Maha Bandha (the great lock)",
    sanskrit: "Maha Bandha",
    description: "The supreme execution where Moola Bandha, Uddiyana Bandha, and Jalandhara Bandha are all activated simultaneously during total internal or external breath retention.",
    benefits: ["The absolute master key to advanced pranic mastery and spiritual awakening"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ba-05",
    category: "Bandha",
    title: "Vajroli Mudra (thunderbolt attitude)",
    sanskrit: "Vajroli Bandha",
    description: "Conscious active contraction and upward drawing of the subtle energetic channels within the urogenital system.",
    benefits: ["Mastery of sexual vitality", "Greatly balances the nervous system"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },

  // ==========================================
  // 9. SATKARMA (7 items)
  // ==========================================
  {
    id: "sk-01",
    category: "Satkarma",
    title: "Kapalbhati (frontal brain cleansing)",
    sanskrit: "Kapalbhati Satkarma",
    description: "Considered both a Pranayam and one of the 6 core Shatkarmas. Rapid active pumping exhalations that completely polish the frontal skull channels.",
    benefits: ["Completely purifies the respiratory tract", "Eliminates excessive mucus and dullness"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sk-02",
    category: "Satkarma",
    title: "Trataka (concentrated gazing)",
    sanskrit: "Trataka",
    description: "Sit entirely still in a dark room and gaze intensely without blinking at the stable flame of a pure ghee lamp until your eyes water slightly, then close eyes to see the afterimage.",
    benefits: ["Cures subtle eye defects and relieves mental anxiety", "Dramatically enhances clairvoyant perception"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sk-03",
    category: "Satkarma",
    title: "Neti, Jala (nasal cleansing with water)",
    sanskrit: "Jala Neti",
    description: "Using a specialized Neti pot filled with warm physiological saltwater to flush water smoothly in through one nostril and out through the other.",
    benefits: ["The ultimate natural remedy for sinus allergies, hay fever, and chronic headaches"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sk-04",
    category: "Satkarma",
    title: "Nauli (abdominal massaging)",
    sanskrit: "Nauli Kriya",
    description: "The elite cleansing practice where the central rectus abdominis muscle is isolated and rolled dynamically in circular waves across the abdomen.",
    benefits: ["Eliminates all known digestive disorders", "Considered the crowning glory of Hatha yoga internal cleansing"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sk-05",
    category: "Satkarma",
    title: "Shankhaprakshalana (washing of the intestines)",
    sanskrit: "Shankhaprakshalana",
    description: "Drinking warm saltwater and executing 5 specific dynamic asanas to systematically flush and clean the entire 30-foot human digestive canal from mouth to anus.",
    benefits: ["A complete physical and spiritual rejuvenation of the entire physical body"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sk-06",
    category: "Satkarma",
    title: "Dhauti, Vahnisara (cleansing with the essence of fire)",
    sanskrit: "Agnisara Kriya",
    description: "Exhale completely, hold your breath out, and rapidly pull your abdominal wall inward and snap it outward over and over until you need to inhale.",
    benefits: ["Stimulates the powerful internal fire of the Manipura navel center", "Superb for sluggish metabolism"],
    imageUrl: "https://images.unsplash.com/photo-1552196566-5e59127163f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sk-07",
    category: "Satkarma",
    title: "Kunjal Kriya (the practice of vomiting water)",
    sanskrit: "Vaman Dhauti / Kunjal Kriya",
    description: "Drinking 6-8 glasses of warm lukewarm salted water on an empty stomach and gently triggering the gag reflex to expel excessive sour acidity and mucus from the stomach.",
    benefits: ["Removes persistent stomach acidity, indigested food toxins, and asthma triggers"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop"
  }
];

// Helper metadata for categories
const CATEGORY_META = {
  "warmup_exercises": { name: "Warmup Exercises", color: "cat-warmup", icon: "🔥", desc: "Gentle physical movements to prepare your joints and muscles." },
  "Simple Asana": { name: "Simple Asana", color: "cat-simple", icon: "🧘", desc: "Fundamental physical postures for everyday vitality and balance." },
  "suryanamaskar_variants": { name: "Surya Namaskar", color: "cat-surya", icon: "🌞", desc: "Rejuvenating solar sequences linking breath with dynamic movement." },
  "Advanced Asana": { name: "Advanced Asana", color: "cat-advanced", icon: "⚡", desc: "Challenging physical postures requiring elite balance and strength." },
  "Pranayam & Dhyana": { name: "Pranayam & Dhyana", color: "cat-pranayam", icon: "💨", desc: "Profound breathing and meditation techniques to quiet the mind." },
  "Sitting Postures": { name: "Sitting Postures", color: "cat-sitting", icon: "🪑", desc: "Stable, comfortable seated foundations for mindfulness." },
  "Mudra": { name: "Mudra", color: "cat-mudra", icon: "✨", desc: "Subtle psychic hand and eye gestures to channel internal energy." },
  "Bandha": { name: "Bandha", color: "cat-bandha", icon: "🔒", desc: "Internal energetic locks to direct and intensify human prana." },
  "Satkarma": { name: "Satkarma", color: "cat-satkarma", icon: "🌊", desc: "Traditional purification practices to completely clean the physical vehicle." }
};
