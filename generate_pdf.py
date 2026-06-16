#!/usr/bin/env python3
"""
Panini Weight Management — 6-Page Offline Clinical PDF Generator
Run: python3 generate_pdf.py
Output: Panini-Offline-Clinical-Form.pdf
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

# ── Colors ───────────────────────────────────────────────────
TEAL_DK = HexColor('#0f766e')
TEAL    = HexColor('#0d9488')
TEAL_LT = HexColor('#ccfbf1')
GREEN   = HexColor('#16a34a')
GREEN_LT= HexColor('#dcfce7')
AMBER   = HexColor('#d97706')
AMBER_LT= HexColor('#fef3c7')
ROSE    = HexColor('#e11d48')
ROSE_LT = HexColor('#ffe4e6')
BLUE    = HexColor('#2563eb')
BLUE_LT = HexColor('#dbeafe')
PURPLE  = HexColor('#7c3aed')
SLATE   = HexColor('#475569')
MUTED   = HexColor('#94a3b8')
LINE    = HexColor('#e2e8f0')
BG      = HexColor('#f8fafc')
INK     = HexColor('#1f2937')
WHITE   = colors.white

W, H = A4   # 595.28 x 841.89 pts
M    = 14*mm
UW   = W - 2*M   # usable width ~567 pts

# ────────────────────────────────────────────────────────────
# HELPERS
# ────────────────────────────────────────────────────────────
def hdr(c, title, pg, sub=''):
    """Page header band"""
    c.setFillColor(TEAL_DK)
    c.rect(0, H-20*mm, W, 20*mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(M, H-9*mm, 'PANINI  WEIGHT  MANAGEMENT')
    c.setFont('Helvetica-Bold', 9)
    c.drawRightString(W-M, H-9*mm, title)
    c.setFont('Helvetica', 7.5)
    c.setFillColor(TEAL_LT)
    c.drawString(M, H-15*mm, f'Page {pg} of 6')
    if sub:
        c.drawRightString(W-M, H-15*mm, sub)

def ftr(c, pg):
    """Page footer"""
    c.setFillColor(LINE)
    c.rect(0, 0, W, 9*mm, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 6.5)
    c.drawString(M, 3.2*mm,
        'Anonymous ID only · No name · No phone · No address stored · '
        'Aligned: AACE / EASO / OMA / KSSO Guidelines')
    c.drawRightString(W-M, 3.2*mm, f'Panini Clinic  ·  Page {pg}')

def sec(c, x, y, w, text, bg=TEAL_DK, fg=WHITE, h=5.5*mm):
    """Section sub-header"""
    c.setFillColor(bg)
    c.rect(x, y-h+1.5*mm, w, h, fill=1, stroke=0)
    c.setFillColor(fg)
    c.setFont('Helvetica-Bold', 7.5)
    c.drawString(x+2.5*mm, y-h+3.5*mm, text.upper())
    return y - h - 1.5*mm

def field(c, x, y, w, h, label, shade=True):
    """Draw labeled field box with writing line"""
    if shade:
        c.setFillColor(BG)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.6)
        c.rect(x, y, w, h, fill=1, stroke=1)
    c.setFillColor(SLATE)
    c.setFont('Helvetica-Bold', 6)
    c.drawString(x+2*mm, y+h-3.5*mm, label.upper())
    c.setStrokeColor(MUTED)
    c.setLineWidth(0.5)
    c.line(x+2*mm, y+2.5*mm, x+w-2*mm, y+2.5*mm)

def cb(c, x, y, label, size=3.5*mm):
    """Checkbox"""
    c.setStrokeColor(SLATE)
    c.setFillColor(WHITE)
    c.setLineWidth(0.7)
    c.rect(x, y, size, size, fill=1, stroke=1)
    c.setFillColor(INK)
    c.setFont('Helvetica', 7.5)
    c.drawString(x+size+1.5*mm, y+0.5*mm, label)
    return x + size + 1.5*mm + c.stringWidth(label,'Helvetica',7.5) + 4*mm

def hline(c, x, y, w):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(x, y, x+w, y)

def writeline(c, x, y, w):
    c.setStrokeColor(MUTED)
    c.setLineWidth(0.5)
    c.line(x, y, x+w, y)

def row_shade(c, x, y, w, h, even):
    if even:
        c.setFillColor(BG)
        c.rect(x, y, w, h, fill=1, stroke=0)

def badge(c, x, y, text, bg, fg=WHITE, pad_x=3*mm, pad_y=1.5*mm):
    tw = c.stringWidth(text,'Helvetica-Bold',7)
    bw = tw + 2*pad_x; bh = 4.5*mm
    c.setFillColor(bg)
    c.roundRect(x, y, bw, bh, 2*mm, fill=1, stroke=0)
    c.setFillColor(fg)
    c.setFont('Helvetica-Bold', 7)
    c.drawString(x+pad_x, y+pad_y, text)
    return bw

def kpi_box(c, x, y, w, h, label, val_area=''):
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.8)
    c.roundRect(x, y, w, h, 2*mm, fill=1, stroke=1)
    c.setFillColor(TEAL_DK)
    c.rect(x, y+h-3.5*mm, w, 3.5*mm, fill=1, stroke=0)
    c.roundRect(x, y+h-3.5*mm, w, 3.5*mm, 2*mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 6)
    c.drawString(x+2*mm, y+h-2.5*mm, label.upper())
    c.setStrokeColor(MUTED)
    c.setLineWidth(0.5)
    c.line(x+2*mm, y+4*mm, x+w-2*mm, y+4*mm)

# ════════════════════════════════════════════════════════════
# PAGE 1 — PATIENT REGISTRATION & ENROLMENT
# ════════════════════════════════════════════════════════════
def page1(c):
    hdr(c, 'PATIENT REGISTRATION & ENROLMENT', 1, 'New Patient  |  Returning Patient')

    y = H - 22*mm
    x = M

    # ── WIN-ID hero ──────────────────────────────────
    c.setFillColor(TEAL_LT)
    c.setStrokeColor(TEAL)
    c.setLineWidth(1.5)
    c.roundRect(x, y-22*mm, UW, 21*mm, 3*mm, fill=1, stroke=1)

    c.setFillColor(TEAL_DK)
    c.setFont('Helvetica-Bold', 8.5)
    c.drawString(x+4*mm, y-4.5*mm, 'ANONYMOUS PATIENT ID  (write on paper file — never stored with name/phone)')
    c.setFont('Helvetica-Bold', 22)
    c.setFillColor(TEAL_DK)
    c.drawString(x+4*mm, y-13*mm, 'WIN –')
    # 6 boxes for ID characters
    for i in range(6):
        bx = x+33*mm + i*12.5*mm
        c.setFillColor(WHITE)
        c.setStrokeColor(TEAL)
        c.setLineWidth(1)
        c.rect(bx, y-15*mm, 11*mm, 10*mm, fill=1, stroke=1)
    c.setFillColor(SLATE)
    c.setFont('Helvetica', 7)
    c.drawString(x+4*mm, y-19.5*mm,
        'Generated by the Panini app  OR  write the app-generated WIN-XXXXXX code here.')
    c.drawRightString(x+UW-4*mm, y-19.5*mm, 'Date: _____ / _____ / _________')

    y -= 24*mm

    # ── Date / Clinic / Physician row ──────────────────
    fw = UW/3 - 2*mm
    field(c, x,           y-14*mm, fw, 13*mm, 'Visit / Registration Date')
    field(c, x+fw+2*mm,   y-14*mm, fw, 13*mm, 'Clinic / Hospital Name')
    field(c, x+2*(fw+2*mm), y-14*mm, fw, 13*mm, 'Physician / Dietician Code')
    y -= 16*mm

    # ── Clinical Basics ──────────────────────────────
    y = sec(c, x, y, UW, '  CLINICAL BASICS  (no personal identifiers)')

    # Row 1: Height, Weight, BMI, Waist, BP
    fw2 = UW/5 - 2*mm
    labels1 = ['Height (cm)', 'Weight (kg)', 'BMI', 'Waist (cm)', 'Blood Pressure']
    for i,lbl in enumerate(labels1):
        field(c, x+i*(fw2+2*mm), y-13*mm, fw2, 13*mm, lbl)
    y -= 15*mm

    # Row 2: Target weight, Year of birth, Sex, Program start, Medication
    fw3 = UW/5 - 2*mm
    labels2 = ['Target Weight (kg)', 'Year of Birth', 'Sex (M/F/O)', 'Program Start Date', 'Primary Medication']
    for i,lbl in enumerate(labels2):
        field(c, x+i*(fw3+2*mm), y-13*mm, fw3, 13*mm, lbl)
    y -= 15*mm

    # Starting dose / next visit row
    field(c, x,            y-11*mm, UW*0.35, 11*mm, 'Starting Dose')
    field(c, x+UW*0.36,    y-11*mm, UW*0.35, 11*mm, 'Target Dose')
    field(c, x+UW*0.73,    y-11*mm, UW*0.26, 11*mm, 'Dietician Referral  Y / N')
    y -= 13*mm

    # ── Comorbidities ─────────────────────────────────
    y = sec(c, x, y, UW, '  ACTIVE COMORBIDITIES  (tick all that apply)', bg=BLUE)
    y -= 1*mm
    comorbidities = [
        'Type 2 Diabetes (T2DM)', 'Hypertension (HTN)', 'Fatty Liver (NAFLD)',
        'Sleep Apnea (OSA)', 'PCOS', 'Dyslipidemia',
        'Osteoarthritis', 'GERD / Reflux', 'Depression / Anxiety',
        'Hypothyroidism', 'Heart Disease (CAD)', 'Other: ___________',
    ]
    cols = 3; cw = UW/cols
    for i, cm_lbl in enumerate(comorbidities):
        row = i // cols; col = i % cols
        cb(c, x + col*cw + 2*mm, y - (row+1)*7*mm, cm_lbl)
    y -= (len(comorbidities)//cols + 1)*7*mm + 1*mm

    # ── Current Medications table ──────────────────────
    y = sec(c, x, y, UW, '  CURRENT MEDICATIONS AT ENROLMENT', bg=PURPLE)
    # Table header
    col_ws = [UW*0.38, UW*0.18, UW*0.18, UW*0.26]
    hdrs   = ['Medication / Drug Name', 'Dose', 'Frequency', 'Since (year/month)']
    c.setFillColor(TEAL_LT); c.setStrokeColor(LINE); c.setLineWidth(0.5)
    tx = x
    for i,(hw,ht) in enumerate(zip(col_ws,hdrs)):
        c.rect(tx, y-5.5*mm, hw, 5.5*mm, fill=1, stroke=1)
        c.setFillColor(TEAL_DK); c.setFont('Helvetica-Bold',6.5)
        c.drawString(tx+1.5*mm, y-3.5*mm, ht)
        c.setFillColor(TEAL_LT); tx+=hw

    for row in range(5):
        tx = x; even = row%2==0
        if even:
            c.setFillColor(BG)
        else:
            c.setFillColor(WHITE)
        for hw in col_ws:
            c.rect(tx, y-(row+2)*6*mm, hw, 6*mm, fill=1, stroke=1)
            tx+=hw
        # write line in each cell
        tx2 = x
        for hw in col_ws:
            writeline(c, tx2+2*mm, y-(row+2)*6*mm+2*mm, hw-4*mm)
            tx2+=hw

    y -= 7*6*mm + 2*mm

    # ── First visit clinical note ──────────────────────
    y = sec(c, x, y, UW, '  FIRST VISIT CLINICAL IMPRESSION / REASON FOR REFERRAL', bg=AMBER)
    c.setFillColor(WHITE); c.setStrokeColor(LINE); c.setLineWidth(0.6)
    c.rect(x, y-20*mm, UW, 19*mm, fill=1, stroke=1)
    for li in range(3):
        writeline(c, x+3*mm, y-6*mm - li*5.5*mm, UW-6*mm)

    ftr(c, 1)


# ════════════════════════════════════════════════════════════
# PAGE 2 — MEDICAL HISTORY & BASELINE LABS
# ════════════════════════════════════════════════════════════
def page2(c):
    hdr(c, 'MEDICAL HISTORY & BASELINE INVESTIGATIONS', 2, 'Initial Visit Only')
    y = H - 22*mm; x = M

    # ── Weight history ────────────────────────────────
    y = sec(c, x, y, UW, '  WEIGHT HISTORY  (from childhood to present)')
    col_ws2 = [UW*0.15, UW*0.18, UW*0.67]
    wh_hdrs = ['Age (years)', 'Weight (kg)', 'Life Event / Trigger (e.g. pregnancy, illness, stress, diet attempt)']
    tx=x
    c.setFillColor(TEAL_LT); c.setStrokeColor(LINE); c.setLineWidth(0.5)
    for hw,ht in zip(col_ws2,wh_hdrs):
        c.rect(tx,y-5.5*mm,hw,5.5*mm,fill=1,stroke=1)
        c.setFillColor(TEAL_DK); c.setFont('Helvetica-Bold',6.5)
        c.drawString(tx+1.5*mm,y-3.5*mm,ht); tx+=hw

    preset_ages = ['0 (Birth)', '5–10 yrs', '11–18 yrs', '20s', '30s', '40s', 'Peak weight', 'Current']
    for ri,age_label in enumerate(preset_ages):
        tx=x; even=ri%2==0
        for j,hw in enumerate(col_ws2):
            c.setFillColor(BG if even else WHITE)
            c.rect(tx,y-(ri+2)*6*mm,hw,6*mm,fill=1,stroke=1)
            if j==0:
                c.setFillColor(SLATE); c.setFont('Helvetica-Bold',6.5)
                c.drawString(tx+1.5*mm,y-(ri+2)*6*mm+2*mm,age_label)
            else:
                writeline(c,tx+2*mm,y-(ri+2)*6*mm+2*mm,hw-4*mm)
            tx+=hw
    y -= (len(preset_ages)+2)*6*mm + 2*mm

    # ── Previous weight loss attempts ─────────────────
    y = sec(c, x, y, UW, '  PREVIOUS WEIGHT LOSS ATTEMPTS', bg=AMBER)
    atts = ['Method / Programme', 'Duration', 'Max loss (kg)', 'Regained?', 'Reason stopped']
    col_ws3 = [UW*0.35, UW*0.13, UW*0.15, UW*0.12, UW*0.25]
    tx=x
    c.setFillColor(AMBER_LT)
    for hw,ht in zip(col_ws3,atts):
        c.rect(tx,y-5.5*mm,hw,5.5*mm,fill=1,stroke=1)
        c.setFillColor(AMBER); c.setFont('Helvetica-Bold',6.5)
        c.drawString(tx+1.5*mm,y-3.5*mm,ht); c.setFillColor(AMBER_LT); tx+=hw
    for ri in range(4):
        tx=x; even=ri%2==0
        for hw in col_ws3:
            c.setFillColor(BG if even else WHITE)
            c.rect(tx,y-(ri+2)*6*mm,hw,6*mm,fill=1,stroke=1)
            writeline(c,tx+2*mm,y-(ri+2)*6*mm+2*mm,hw-4*mm); tx+=hw
    y -= 6*6*mm + 2*mm

    # ── Baseline Labs ─────────────────────────────────
    y = sec(c, x, y, UW, '  BASELINE LABORATORY INVESTIGATIONS', bg=BLUE)
    # Two column lab layout
    lw = UW/2 - 3*mm
    labs_left = [
        ('HbA1c (%)',         'Normal < 5.7%'),
        ('Fasting Blood Sugar (mg/dL)', 'Normal < 100'),
        ('Fasting Insulin (uIU/mL)',    ''),
        ('HOMA-IR',           'Resistance > 2.5'),
        ('LDL Cholesterol (mg/dL)',     'Target < 100'),
        ('HDL Cholesterol (mg/dL)',     'M>40 / F>50'),
        ('Triglycerides (mg/dL)',       'Normal < 150'),
        ('Total Cholesterol (mg/dL)',   ''),
    ]
    labs_right = [
        ('ALT / SGPT (U/L)',   'Normal < 40'),
        ('AST / SGOT (U/L)',   ''),
        ('GGT (U/L)',          ''),
        ('Serum Creatinine',   ''),
        ('TSH (mIU/L)',        'Normal 0.4–4.0'),
        ('Vitamin D (ng/mL)',  'Sufficient > 30'),
        ('Vitamin B12 (pg/mL)',''),
        ('Cortisol AM (ug/dL)', 'If suspected'),
    ]
    lh = 6*mm
    for ri,(lbl,ref) in enumerate(labs_left):
        ry = y - (ri+1)*lh
        even = ri%2==0
        c.setFillColor(BG if even else WHITE)
        c.setStrokeColor(LINE); c.setLineWidth(0.4)
        c.rect(x, ry, lw, lh, fill=1, stroke=1)
        c.setFillColor(INK); c.setFont('Helvetica-Bold',6.5)
        c.drawString(x+1.5*mm, ry+3.5*mm, lbl)
        if ref:
            c.setFillColor(MUTED); c.setFont('Helvetica',5.5)
            c.drawString(x+1.5*mm, ry+1*mm, ref)
        writeline(c, x+lw*0.55, ry+3*mm, lw*0.42)
        c.setFillColor(SLATE); c.setFont('Helvetica',6)
        c.drawString(x+lw*0.56, ry+1*mm, 'Result:')

    rx = x + lw + 3*mm
    for ri,(lbl,ref) in enumerate(labs_right):
        ry = y - (ri+1)*lh
        even = ri%2==0
        c.setFillColor(BG if even else WHITE)
        c.rect(rx, ry, lw, lh, fill=1, stroke=1)
        c.setFillColor(INK); c.setFont('Helvetica-Bold',6.5)
        c.drawString(rx+1.5*mm, ry+3.5*mm, lbl)
        if ref:
            c.setFillColor(MUTED); c.setFont('Helvetica',5.5)
            c.drawString(rx+1.5*mm, ry+1*mm, ref)
        writeline(c, rx+lw*0.55, ry+3*mm, lw*0.42)
        c.setFillColor(SLATE); c.setFont('Helvetica',6)
        c.drawString(rx+lw*0.56, ry+1*mm, 'Result:')

    y -= (len(labs_left)+1)*lh + 2*mm

    # ── Secondary causes screen ────────────────────────
    y = sec(c, x, y, UW, '  SECONDARY CAUSES OF OBESITY  (rule out)', bg=ROSE)
    sc_items = [
        'Hypothyroidism  (TSH elevated?)', 'Cushing syndrome  (buffalo hump, striae?)',
        'PCOS  (irregular cycles, hirsutism?)', 'Hypothalamic obesity  (prior surgery/radiation?)',
        'Drug-induced  (steroids, antipsychotics, insulin?)', 'Prader-Willi / genetic syndrome?',
    ]
    for i,sc in enumerate(sc_items):
        col_pos = i%2; row_pos = i//2
        cx = x + col_pos*(UW/2) + 2*mm
        cy = y - (row_pos+1)*7*mm
        cb(c, cx, cy, sc)
    y -= (len(sc_items)//2 + 1)*7*mm + 2*mm

    # Imaging / special tests note row
    field(c, x, y-10*mm, UW*0.48, 10*mm, 'Ultrasound Abdomen Finding')
    field(c, x+UW*0.5, y-10*mm, UW*0.49, 10*mm, 'Sleep Study / CPAP Status')

    ftr(c, 2)


# ════════════════════════════════════════════════════════════
# PAGE 3 — LIFESTYLE ASSESSMENT
# ════════════════════════════════════════════════════════════
def page3(c):
    hdr(c, 'LIFESTYLE ASSESSMENT', 3, 'Diet  ·  Exercise  ·  Sleep  ·  Readiness')
    y = H - 22*mm; x = M

    # ── Diet ──────────────────────────────────────────
    y = sec(c, x, y, UW, '  DIETARY PATTERN & 24-HOUR RECALL')
    meals = [
        ('Wake-up Time / Morning Routine', '7.5%'),
        ('Breakfast  (time / what / quantity)', '20%'),
        ('Mid-Morning Snack', '7.5%'),
        ('Lunch  (time / what / quantity)', '20%'),
        ('Afternoon Snack', '7.5%'),
        ('Dinner  (time / what / quantity)', '20%'),
        ('Late Night / Binge Episodes', '7.5%'),
        ('Water / Fluid Intake per Day', '7.5%'),
        ('Protein Intake per Day (approx.)', '7.5%'),
    ]
    # Use simple 2 col with label + writeline
    mh = 8*mm
    col1_w = UW*0.28; col2_w = UW*0.72
    for ri,(lbl,_) in enumerate(meals):
        ry = y - (ri+1)*mh
        even = ri%2==0
        c.setFillColor(TEAL_LT if ri==0 else (BG if even else WHITE))
        c.setStrokeColor(LINE); c.setLineWidth(0.4)
        c.rect(x,      ry, col1_w, mh, fill=1, stroke=1)
        c.rect(x+col1_w, ry, col2_w, mh, fill=1, stroke=1)
        c.setFillColor(INK if ri>0 else TEAL_DK)
        c.setFont('Helvetica-Bold' if ri==0 else 'Helvetica', 6.5)
        c.drawString(x+1.5*mm, ry+3*mm, lbl if ri>0 else 'MEAL / TIME')
        writeline(c, x+col1_w+2*mm, ry+3*mm, col2_w-4*mm)
    y -= (len(meals)+1)*mh + 1.5*mm

    # Eating habits checkboxes
    y = sec(c, x, y, UW, '  EATING HABITS  (tick all that apply)', bg=AMBER)
    habits = ['Eats fast', 'Late-night eating', 'Emotional eating', 'Binge episodes',
              'Skips breakfast', 'Frequent eating out', 'High sugar drinks', 'High salt intake',
              'Vegetarian', 'Vegan', 'Non-vegetarian', 'Alcohol use']
    ch_per_row = 4; ch_w = UW/ch_per_row
    for i,h_lbl in enumerate(habits):
        row=i//ch_per_row; col=i%ch_per_row
        cb(c, x+col*ch_w+2*mm, y-(row+1)*7*mm, h_lbl)
    y -= (len(habits)//ch_per_row+1)*7*mm + 2*mm

    # ── Exercise ───────────────────────────────────────
    y = sec(c, x, y, UW, '  PHYSICAL ACTIVITY ASSESSMENT', bg=GREEN)
    exf = UW/4 - 2*mm
    ex_labels = ['Current Steps / Day', 'Exercise Type', 'Frequency (days/wk)', 'Duration (min/session)']
    for i,el in enumerate(ex_labels):
        field(c, x+i*(exf+2*mm), y-11*mm, exf, 11*mm, el)
    y -= 13*mm
    # Activity level + limitations
    field(c, x,         y-10*mm, UW*0.48, 10*mm, 'Exercise Limitations / Joint Pain')
    field(c, x+UW*0.5,  y-10*mm, UW*0.49, 10*mm, 'Current Exercise Goal')
    y -= 12*mm

    # ── Sleep & Stress ─────────────────────────────────
    y = sec(c, x, y, UW, '  SLEEP & STRESS', bg=PURPLE)
    sf = UW/3 - 2*mm
    sl_labels = ['Sleep Hours / Night', 'Sleep Quality (1-10)', 'CPAP / OSA Status']
    for i,sl in enumerate(sl_labels):
        field(c, x+i*(sf+2*mm), y-10*mm, sf, 10*mm, sl)
    y -= 12*mm

    # Stress scale — visual
    c.setFillColor(INK); c.setFont('Helvetica-Bold',7)
    c.drawString(x, y-4*mm, 'CURRENT STRESS LEVEL:')
    scale_w = UW*0.6; box_w = scale_w/10
    for i in range(10):
        bx = x+30*mm+i*box_w
        shade = [GREEN_LT,GREEN_LT,GREEN_LT,AMBER_LT,AMBER_LT,
                 AMBER_LT,AMBER_LT,ROSE_LT,ROSE_LT,ROSE_LT][i]
        c.setFillColor(shade); c.setStrokeColor(WHITE); c.setLineWidth(0.8)
        c.rect(bx, y-8*mm, box_w-0.5*mm, 6*mm, fill=1, stroke=1)
        c.setFillColor(SLATE); c.setFont('Helvetica-Bold',7)
        c.drawCentredString(bx+box_w/2, y-6.5*mm, str(i+1))
    c.setFillColor(MUTED); c.setFont('Helvetica',6.5)
    c.drawString(x+30*mm, y-10*mm,'1 = No stress')
    c.drawRightString(x+30*mm+scale_w, y-10*mm,'10 = Extreme')
    y -= 12*mm

    # ── Readiness ──────────────────────────────────────
    y = sec(c, x, y, UW, '  READINESS TO CHANGE  (patient self-assessment)', bg=BLUE)
    y -= 1*mm
    readiness_q = [
        ('Readiness to change diet', 'How ready are you to change your eating habits?'),
        ('Readiness to exercise',    'How ready are you to increase physical activity?'),
        ('Readiness for medication', 'How ready are you to start/continue GLP-1 medication?'),
        ('Overall programme confidence', 'How confident are you of success in this programme?'),
    ]
    rw = UW/len(readiness_q) - 2*mm
    for i,(rlbl,rsub) in enumerate(readiness_q):
        rx_pos = x+i*(rw+2*mm)
        c.setFillColor(BLUE_LT); c.setStrokeColor(LINE); c.setLineWidth(0.5)
        c.roundRect(rx_pos, y-18*mm, rw, 17*mm, 1.5*mm, fill=1, stroke=1)
        c.setFillColor(BLUE); c.setFont('Helvetica-Bold',6.5)
        # Wrap label
        c.drawString(rx_pos+1.5*mm, y-4*mm, rlbl)
        c.setFillColor(MUTED); c.setFont('Helvetica',5.5)
        words = rsub.split()
        line1 = ' '.join(words[:4]); line2 = ' '.join(words[4:])
        c.drawString(rx_pos+1.5*mm, y-7*mm, line1)
        c.drawString(rx_pos+1.5*mm, y-9.5*mm, line2)
        # Score circle
        c.setFillColor(WHITE); c.setStrokeColor(BLUE); c.setLineWidth(1)
        c.circle(rx_pos+rw/2, y-14.5*mm, 4*mm, fill=1, stroke=1)
        c.setFillColor(BLUE); c.setFont('Helvetica-Bold',6)
        c.drawCentredString(rx_pos+rw/2, y-15.5*mm, '0–10')

    ftr(c, 3)


# ════════════════════════════════════════════════════════════
# PAGE 4 — VISIT PROGRESS LOG  (12 visits)
# ════════════════════════════════════════════════════════════
def page4(c):
    hdr(c, 'VISIT PROGRESS LOG', 4, 'One row per visit · Update at each appointment')
    y = H - 22*mm; x = M

    # Instructions
    c.setFillColor(TEAL_LT); c.setStrokeColor(TEAL); c.setLineWidth(0.8)
    c.roundRect(x, y-10*mm, UW, 9*mm, 2*mm, fill=1, stroke=1)
    c.setFillColor(TEAL_DK); c.setFont('Helvetica-Bold',7)
    c.drawString(x+3*mm, y-4.5*mm,
        'Fill one row at each visit. TBWL% = (Start Wt - Current Wt) / Start Wt × 100. '
        'NSV = Non-scale victory (BP reduced, medication cut, better sleep, more steps…)')
    y -= 12*mm

    # Table columns
    cols = [
        ('#',          10*mm),
        ('Date',       21*mm),
        ('Mo.',         9*mm),
        ('Wt (kg)',    16*mm),
        ('TBWL%',      14*mm),
        ('Waist cm',   15*mm),
        ('BP',         16*mm),
        ('Dose',       28*mm),
        ('Steps/Day',  17*mm),
        ('NSV / Win this Visit',  UW - (10+21+9+16+14+15+16+28+17+18)*mm),
        ('SE / Notes', 18*mm),
    ]
    # Adjust last col
    total_fixed = sum(w for _,w in cols[:-2]) + 18*mm
    cols[-2] = ('NSV / Win this Visit', UW - total_fixed)

    th = 6.5*mm; rh = 8.5*mm

    # Header
    tx = x
    c.setFillColor(TEAL_DK)
    c.rect(x, y-th, UW, th, fill=1, stroke=0)
    for col_lbl, cw in cols:
        c.setFillColor(WHITE); c.setFont('Helvetica-Bold', 6)
        # wrap if needed
        if len(col_lbl) > 12:
            mid = len(col_lbl)//2
            sp = col_lbl.rfind(' ', 0, mid)
            if sp == -1: sp = mid
            c.drawString(tx+1.5*mm, y-th+4.5*mm, col_lbl[:sp].strip())
            c.drawString(tx+1.5*mm, y-th+1.5*mm, col_lbl[sp:].strip())
        else:
            c.drawCentredString(tx+cw/2, y-th+2*mm, col_lbl)
        c.setStrokeColor(TEAL); c.setLineWidth(0.4)
        c.line(tx+cw, y, tx+cw, y-th)
        tx += cw

    y -= th

    # 12 data rows
    for ri in range(12):
        ry = y - (ri+1)*rh
        even = ri%2==0
        c.setFillColor(BG if even else WHITE)
        c.setStrokeColor(LINE); c.setLineWidth(0.35)
        c.rect(x, ry, UW, rh, fill=1, stroke=1)

        tx = x
        # Row num
        c.setFillColor(TEAL_DK if ri<3 else (SLATE if ri<6 else MUTED))
        c.setFont('Helvetica-Bold', 7)
        c.drawCentredString(tx + cols[0][1]/2, ry + rh/2 - 2.5*mm, str(ri+1))
        tx += cols[0][1]

        # Remaining cells — just write lines
        for ci,(col_lbl,cw) in enumerate(cols[1:], 1):
            c.setStrokeColor(LINE); c.setLineWidth(0.35)
            c.line(tx, ry, tx, ry+rh)
            writeline(c, tx+1.5*mm, ry+2.5*mm, cw-3*mm)
            tx += cw

        # Dose chip label on first 2 rows
        if ri < 2:
            dose_x = x + sum(w for _,w in cols[:8])
            c.setFillColor(TEAL_LT)
            c.roundRect(dose_x+1*mm, ry+1.5*mm, cols[8][1]-2*mm, 5*mm, 1*mm, fill=1, stroke=0)

    y -= 12*rh + 2*mm

    # ── Legend / abbreviations ────────────────────────
    y = sec(c, x, y, UW, '  ABBREVIATIONS & REFERENCE', bg=MUTED)
    legend_items = [
        ('Wt',    'Weight in kg'),
        ('TBWL%', '% Total Body Weight Lost from start'),
        ('BP',    'Blood Pressure (SBP/DBP mmHg)'),
        ('Mo.',   'Months from programme start'),
        ('NSV',   'Non-Scale Victory (any health or quality-of-life win)'),
        ('SE',    'Side Effects reported this visit'),
        ('Dose',  'Current medication + dose (e.g. Sema 0.5mg/wk)'),
    ]
    li_w = UW/2 - 3*mm
    for i,(abbr,defn) in enumerate(legend_items):
        col = i%2; row = i//2
        lx = x + col*(li_w+3*mm)
        ly = y - (row+1)*6.5*mm
        c.setFillColor(INK); c.setFont('Helvetica-Bold',7)
        c.drawString(lx+2*mm, ly+1.5*mm, abbr+':')
        c.setFont('Helvetica',7); c.setFillColor(SLATE)
        c.drawString(lx+2*mm+c.stringWidth(abbr+':', 'Helvetica-Bold',7)+1.5*mm, ly+1.5*mm, defn)

    ftr(c, 4)


# ════════════════════════════════════════════════════════════
# PAGE 5 — WEIGHT JOURNEY GRAPH  (manual plotting)
# ════════════════════════════════════════════════════════════
def page5(c):
    hdr(c, 'WEIGHT JOURNEY GRAPH', 5, 'Plot each visit weight · Track your trajectory')
    y = H - 22*mm; x = M

    # Instructions
    c.setFillColor(AMBER_LT); c.setStrokeColor(AMBER); c.setLineWidth(0.8)
    c.roundRect(x, y-9*mm, UW, 8*mm, 2*mm, fill=1, stroke=1)
    c.setFillColor(AMBER); c.setFont('Helvetica-Bold',7)
    c.drawString(x+3*mm, y-3.5*mm,
        'HOW TO USE:  1. Mark start weight at Month 0   '
        '2. Plot each visit weight as a dot   '
        '3. Connect dots with a line   '
        '4. Draw dashed line for target weight')
    y -= 11*mm

    # Graph area
    GX = x + 14*mm    # graph left (space for y-axis labels)
    GY = 15*mm + 9*mm # graph bottom (footer + legend space)
    GW = UW - 14*mm   # graph width
    GH = y - GY       # graph height

    # Y-axis: weight 50 to 130 kg (80 kg range)
    W_MIN = 50; W_MAX = 130; W_RANGE = W_MAX - W_MIN
    # X-axis: months 0 to 36
    M_MAX = 36

    def gx(month):  return GX + (month / M_MAX) * GW
    def gy(wt):     return GY + ((wt - W_MIN) / W_RANGE) * GH

    # BMI zone bands (height ~165cm)
    h_ref = 1.65
    bmi_zones = [
        (W_MIN,    h_ref**2 * 18.5, HexColor('#dbeafe'), 'Underweight BMI<18.5'),
        (h_ref**2*18.5, h_ref**2*25,  HexColor('#d1fae5'), 'Normal BMI 18.5-25'),
        (h_ref**2*25,   h_ref**2*30,  HexColor('#fef9c3'), 'Overweight BMI 25-30'),
        (h_ref**2*30,   h_ref**2*35,  HexColor('#fee2e2'), 'Obese I BMI 30-35'),
        (h_ref**2*35,   h_ref**2*40,  HexColor('#fde8e8'), 'Obese II BMI 35-40'),
        (h_ref**2*40,   W_MAX,         HexColor('#f3e8ff'), 'Obese III BMI>40'),
    ]
    for (wlo, whi, zone_col, zlbl) in bmi_zones:
        wlo_c = max(wlo, W_MIN); whi_c = min(whi, W_MAX)
        if wlo_c >= W_MAX or whi_c <= W_MIN: continue
        y1 = gy(wlo_c); y2 = gy(whi_c)
        c.setFillColor(zone_col)
        c.rect(GX, y1, GW, y2-y1, fill=1, stroke=0)
        # BMI label on right edge
        mid_y = (y1+y2)/2
        c.setFillColor(MUTED); c.setFont('Helvetica',5.5)
        c.drawRightString(GX+GW-1*mm, mid_y-2*mm, zlbl)

    # Grid lines — horizontal (weight)
    c.setStrokeColor(LINE); c.setLineWidth(0.4)
    for wt in range(50, 135, 5):
        yp = gy(wt)
        c.setDash(2,3)
        c.line(GX, yp, GX+GW, yp)
        c.setDash()
        c.setFillColor(SLATE); c.setFont('Helvetica-Bold',6.5)
        c.drawRightString(GX-1*mm, yp-2*mm, str(wt))

    # Grid lines — vertical (months)
    for mo in range(0, 37, 2):
        xp = gx(mo)
        c.setDash(2,3)
        c.line(xp, GY, xp, GY+GH)
        c.setDash()
        c.setFillColor(SLATE); c.setFont('Helvetica',6)
        c.drawCentredString(xp, GY-5*mm, str(mo))
        if mo in [0,6,12,18,24,30,36]:
            c.setFillColor(TEAL_DK); c.setFont('Helvetica-Bold',6)
            c.drawCentredString(xp, GY-9*mm, ['Start','6mo','1yr','18mo','2yr','30mo','3yr'][mo//6])

    # Axes
    c.setStrokeColor(INK); c.setLineWidth(1)
    c.line(GX, GY, GX, GY+GH)  # y-axis
    c.line(GX, GY, GX+GW, GY)  # x-axis

    # Axis labels
    c.setFillColor(INK); c.setFont('Helvetica-Bold',8)
    c.drawCentredString(GX+GW/2, GY-13*mm, 'MONTHS FROM PROGRAMME START')
    c.saveState()
    c.rotate(90)
    c.drawCentredString(GY+GH/2, -(GX-10*mm), 'WEIGHT  (kg)')
    c.restoreState()

    # Target weight label
    c.setFillColor(GREEN); c.setFont('Helvetica-Bold',7)
    c.drawString(GX+2*mm, gy(75)+2*mm, 'TARGET  75 kg  ←── draw your target weight line here')
    c.setStrokeColor(GREEN); c.setLineWidth(1.2)
    c.setDash(8,4)
    c.line(GX, gy(75), GX+GW, gy(75))
    c.setDash()

    # Start weight label
    c.setFillColor(TEAL_DK); c.setFont('Helvetica-Bold',7)
    c.drawString(GX+2*mm, gy(102)+2*mm, 'Example start weight 102 kg')
    c.setFillColor(TEAL)
    c.circle(gx(0), gy(102), 2.5*mm, fill=1, stroke=0)

    # Sample trajectory dots (demo)
    demo_pts = [(0,102),(2,99.5),(4,97),(6,94.2),(8,91.5),(10,89.2),
                (12,87.8),(14,86.5),(16,85.8),(18,85.2),(24,84.2),(36,83)]
    for i,(mo,wt) in enumerate(demo_pts):
        c.setFillColor(TEAL); c.setStrokeColor(WHITE); c.setLineWidth(0.8)
        c.circle(gx(mo), gy(wt), 1.8*mm, fill=1, stroke=1)
    # Connect dots
    c.setStrokeColor(TEAL); c.setLineWidth(1.2)
    pts = [(gx(mo), gy(wt)) for mo,wt in demo_pts]
    p = c.beginPath()
    p.moveTo(*pts[0])
    for pt in pts[1:]:
        p.lineTo(*pt)
    c.drawPath(p, stroke=1, fill=0)
    c.setFillColor(TEAL); c.setFont('Helvetica',6)
    c.drawString(gx(14), gy(86.5)+3*mm, 'Demo trajectory (WIN-DEMO01)')

    # Legend
    legend_y = GY - 13*mm
    items = [
        (TEAL,   'circle', 'Your weight at each visit'),
        (GREEN,  'dash',   'Target weight line'),
        (BLUE_LT,'rect',   'Healthy BMI zone'),
        (AMBER_LT,'rect',  'Overweight zone'),
        (ROSE_LT,'rect',   'Obese zone'),
    ]
    lx = GX
    for (col,shape,lbl) in items:
        c.setFillColor(col)
        if shape=='circle': c.circle(lx+2*mm, legend_y+2*mm, 2*mm, fill=1, stroke=0)
        elif shape=='rect':  c.rect(lx+1*mm, legend_y+0.5*mm, 4*mm, 3.5*mm, fill=1, stroke=0)
        elif shape=='dash':
            c.setStrokeColor(col); c.setLineWidth(1.5); c.setDash(4,2)
            c.line(lx+1*mm, legend_y+2*mm, lx+5*mm, legend_y+2*mm); c.setDash()
        c.setFillColor(SLATE); c.setFont('Helvetica',6.5)
        tw = c.stringWidth(lbl,'Helvetica',6.5)
        c.drawString(lx+6.5*mm, legend_y+0.5*mm, lbl)
        lx += tw + 16*mm

    # Milestone annotation area
    y_ann = GY - 13*mm
    c.setFillColor(PURPLE_LT := HexColor('#ede9fe'))
    c.setStrokeColor(PURPLE); c.setLineWidth(0.6)
    c.roundRect(GX+GW*0.6, y_ann, GW*0.38, 12*mm, 2*mm, fill=1, stroke=1)
    c.setFillColor(PURPLE); c.setFont('Helvetica-Bold',6.5)
    c.drawString(GX+GW*0.61, y_ann+9*mm, 'KEY MILESTONES TO MARK ON GRAPH:')
    c.setFont('Helvetica',6); c.setFillColor(INK)
    milestones = ['◉ Medication dose change', '★ Comorbidity medication stopped',
                  '▲ Exercise goal reached', '● Lab result milestone']
    for i,m in enumerate(milestones):
        c.drawString(GX+GW*0.61, y_ann+7*mm-i*2.2*mm, m)

    ftr(c, 5)


# ════════════════════════════════════════════════════════════
# PAGE 6 — PATIENT COACHING CARD  (printable, hand to patient)
# ════════════════════════════════════════════════════════════
def page6(c):
    hdr(c, 'PATIENT COACHING CARD', 6, 'Print · Sign · Hand to patient at each visit')
    y = H - 22*mm; x = M

    # ── Visit header row ──────────────────────────────
    c.setFillColor(TEAL_LT); c.setStrokeColor(TEAL); c.setLineWidth(0.8)
    c.roundRect(x, y-12*mm, UW, 11*mm, 2*mm, fill=1, stroke=1)
    fw4 = UW/4 - 2*mm
    card_fields = ['Patient ID (WIN-)', 'Visit Date', 'Visit Number', 'Physician']
    for i,lbl in enumerate(card_fields):
        fx = x+i*(fw4+2*mm)+2*mm
        c.setFillColor(TEAL_DK); c.setFont('Helvetica-Bold',6.5)
        c.drawString(fx, y-4*mm, lbl.upper())
        writeline(c, fx, y-9*mm, fw4-2*mm)
    y -= 14*mm

    # ── Stats panel ───────────────────────────────────
    y = sec(c, x, y, UW, '  YOUR PROGRESS THIS VISIT', bg=TEAL_DK)

    kw = UW/5 - 2.5*mm
    kpis = ['Start Weight\n(kg)', 'Today\'s Weight\n(kg)', 'Lost So Far\n(kg)',
            'TBWL %', 'Current BMI']
    for i,kp in enumerate(kpis):
        kx = x+i*(kw+2.5*mm)
        c.setFillColor(TEAL_LT if i<2 else GREEN_LT if i<4 else BLUE_LT)
        c.setStrokeColor(TEAL if i<2 else GREEN if i<4 else BLUE)
        c.setLineWidth(1.2)
        c.roundRect(kx, y-22*mm, kw, 21*mm, 2*mm, fill=1, stroke=1)
        kp_lines = kp.split('\n')
        c.setFillColor(TEAL_DK if i<2 else GREEN if i<4 else BLUE)
        c.setFont('Helvetica-Bold',6.5)
        c.drawCentredString(kx+kw/2, y-4.5*mm, kp_lines[0])
        if len(kp_lines)>1:
            c.drawCentredString(kx+kw/2, y-7*mm, kp_lines[1])
        # Large value box
        writeline(c, kx+4*mm, y-14*mm, kw-8*mm)
        c.setFillColor(MUTED); c.setFont('Helvetica',5.5)
        c.drawCentredString(kx+kw/2, y-20*mm, 'Write value above')
    y -= 24*mm

    # ── Two column layout ─────────────────────────────
    col_w = UW/2 - 3*mm

    # Left: Wins this visit
    y_left = sec(c, x, y, col_w, '  MY WINS THIS VISIT  (Non-scale victories)', bg=GREEN)
    win_labels = [
        'BP / medication reduced or stopped',
        'Clothes fitting better / size down',
        'More energy / less fatigue',
        'Better sleep / no CPAP needed',
        'Steps goal achieved this week',
        'Lab result improved (HbA1c / LDL)',
        'Knee / joint pain reduced',
        'Breathlessness improved',
        'Other win: _______________________',
    ]
    for i,wl in enumerate(win_labels):
        cb(c, x+2*mm, y_left-(i+1)*7*mm, wl)
    y_left -= (len(win_labels)+1)*7*mm

    # Right: Focus & goals
    y_right = sec(c, x+col_w+3*mm, y, col_w, '  MY FOCUS FOR NEXT VISIT', bg=BLUE)
    focus_items = [
        ('Protein target', '______ g/day'),
        ('Water target',   '______ L/day'),
        ('Steps goal',     '______ /day'),
        ('Exercise',       '___ days/wk · ___ min'),
        ('Sleep target',   '______ hrs/night'),
        ('Medication',     '__________________'),
    ]
    rh_f = 9*mm
    for i,(fl,fv) in enumerate(focus_items):
        ry_f = y_right-(i+1)*rh_f
        c.setFillColor(BLUE_LT if i%2==0 else WHITE)
        c.setStrokeColor(LINE); c.setLineWidth(0.4)
        c.rect(x+col_w+3*mm, ry_f, col_w, rh_f, fill=1, stroke=1)
        c.setFillColor(BLUE); c.setFont('Helvetica-Bold',7)
        c.drawString(x+col_w+5*mm, ry_f+5.5*mm, fl)
        writeline(c, x+col_w+5*mm+c.stringWidth(fl,'Helvetica-Bold',7)+2*mm,
                  ry_f+5.5*mm, col_w-c.stringWidth(fl,'Helvetica-Bold',7)-8*mm)
        c.setFillColor(MUTED); c.setFont('Helvetica',7)
        c.drawString(x+col_w+5*mm, ry_f+2*mm, fv)
    y_right -= (len(focus_items)+1)*rh_f

    y = min(y_left, y_right) - 3*mm

    # ── Labs this visit ────────────────────────────────
    y = sec(c, x, y, UW, '  LABS THIS VISIT  (fill only if done today)', bg=PURPLE)
    lab_f = [
        ('HbA1c %',''), ('FBG mg/dL',''), ('LDL mg/dL',''), ('TG mg/dL',''),
        ('HDL mg/dL',''), ('ALT U/L',''), ('BP mmHg',''), ('Weight kg',''),
    ]
    lf_w = UW/len(lab_f) - 1.5*mm
    for i,(ll,_) in enumerate(lab_f):
        lx = x+i*(lf_w+1.5*mm)
        c.setFillColor(HexColor('#f3e8ff') if i%2==0 else WHITE)
        c.setStrokeColor(LINE); c.setLineWidth(0.5)
        c.rect(lx, y-14*mm, lf_w, 14*mm, fill=1, stroke=1)
        c.setFillColor(PURPLE); c.setFont('Helvetica-Bold',6)
        c.drawCentredString(lx+lf_w/2, y-4*mm, ll)
        writeline(c, lx+2*mm, y-9*mm, lf_w-4*mm)
    y -= 16*mm

    # ── Medication reminder ────────────────────────────
    y = sec(c, x, y, UW, '  MEDICATION & NEXT STEPS', bg=AMBER)
    c.setFillColor(AMBER_LT); c.setStrokeColor(AMBER); c.setLineWidth(0.7)
    c.roundRect(x, y-16*mm, UW, 15*mm, 2*mm, fill=1, stroke=1)
    med_fields = [
        ('Current Medication & Dose', UW*0.35),
        ('Next Dose Change Plan',     UW*0.25),
        ('Next Appointment Date',     UW*0.18),
        ('Referral / Action',         UW*0.18),
    ]
    mx = x+2*mm; gap=3*mm
    for i,(ml,mw) in enumerate(med_fields):
        c.setFillColor(AMBER); c.setFont('Helvetica-Bold',6.5)
        c.drawString(mx, y-4*mm, ml.upper())
        writeline(c, mx, y-9*mm, mw-gap)
        writeline(c, mx, y-13*mm, mw-gap)
        mx += mw
    y -= 18*mm

    # ── Motivational message ───────────────────────────
    c.setFillColor(GREEN_LT); c.setStrokeColor(GREEN); c.setLineWidth(1)
    c.roundRect(x, y-16*mm, UW, 15*mm, 3*mm, fill=1, stroke=1)
    c.setFillColor(GREEN); c.setFont('Helvetica-Bold',9)
    c.drawCentredString(x+UW/2, y-6*mm, '"Every kilogram lost is a step closer to a healthier, longer life."')
    c.setFont('Helvetica',7.5); c.setFillColor(SLATE)
    c.drawCentredString(x+UW/2, y-11*mm,
        'Your commitment to this programme is improving your health in ways that go far beyond the scale.')
    y -= 18*mm

    # ── Signature strip ────────────────────────────────
    sig_w = UW/3 - 3*mm
    sig_labels = ['Patient Signature', 'Physician / Dietician', 'Date']
    for i,sl in enumerate(sig_labels):
        sx = x+i*(sig_w+3*mm)
        c.setStrokeColor(SLATE); c.setLineWidth(0.7)
        c.line(sx, y-8*mm, sx+sig_w, y-8*mm)
        c.setFillColor(MUTED); c.setFont('Helvetica',7)
        c.drawString(sx, y-11*mm, sl)

    ftr(c, 6)


# ════════════════════════════════════════════════════════════
# MAIN
# ════════════════════════════════════════════════════════════
def generate():
    out = '/sessions/serene-confident-mccarthy/mnt/panini_obesity/Panini-Offline-Clinical-Form.pdf'
    c = canvas.Canvas(out, pagesize=A4)
    c.setTitle('Panini Weight Management — 6-Page Offline Clinical Form')
    c.setAuthor('Panini Clinic')
    c.setSubject('Offline clinical form: Registration · History · Lifestyle · Visit Log · Weight Graph · Coaching Card')

    page1(c); c.showPage()
    page2(c); c.showPage()
    page3(c); c.showPage()
    page4(c); c.showPage()
    page5(c); c.showPage()
    page6(c); c.showPage()
    c.save()
    print(f'Generated: {out}')

if __name__ == '__main__':
    generate()
