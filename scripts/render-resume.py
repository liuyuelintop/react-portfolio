"""Render the checked-in Markdown resume. Requires ReportLab (bundled Codex Python).

Run from the repository root: python3 scripts/render-resume.py
Both public PDF URLs receive identical bytes. Review rendered pages before release.
"""
from html import escape
from pathlib import Path
import re
import shutil
import reportlab

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

FONT_DIR = Path(reportlab.__file__).parent / "fonts"
for name, file in [("Resume", "Vera.ttf"), ("Resume-Bold", "VeraBd.ttf"),
                   ("Resume-Oblique", "VeraIt.ttf"), ("Resume-BoldOblique", "VeraBI.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / file)))

ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = ROOT / "public" / "resume"
SOURCE = DIRECTORY / "Yuelin_Liu_Resume_2026-10.md"
TARGET = DIRECTORY / "Yuelin_Liu_Resume_2026-10.pdf"

pdfmetrics.registerFontFamily("Resume", normal="Resume", bold="Resume-Bold",
                              italic="Resume-Oblique", boldItalic="Resume-BoldOblique")

styles = {
    "name": ParagraphStyle("name", fontName="Resume-Bold", fontSize=22, leading=25, spaceAfter=6),
    "section": ParagraphStyle("section", fontName="Resume-Bold", fontSize=10, leading=13,
                              textColor=colors.HexColor("#164e63"), spaceBefore=10, spaceAfter=5, keepWithNext=True),
    "role": ParagraphStyle("role", fontName="Resume-Bold", fontSize=9.3, leading=12,
                           spaceBefore=7, spaceAfter=4, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="Resume", fontSize=9, leading=12, spaceAfter=4, alignment=TA_LEFT),
    "bullet": ParagraphStyle("bullet", fontName="Resume", fontSize=9, leading=12,
                             leftIndent=9, firstLineIndent=-7, spaceAfter=4),
}


def inline(text):
    text = text.replace("—", "-").replace("–", "-").replace("→", " to ").replace("’", "'")
    text = escape(text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<link href="\2" color="#164e63">\1</link>', text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    return re.sub(r"\*(.+?)\*", r"<i>\1</i>", text)


def footer(canvas, doc):
    canvas.setFont("Resume", 8)
    canvas.setFillColor(colors.HexColor("#64748b"))
    canvas.drawString(38, 25, "Yuelin Liu | liuyuelin.dev")
    canvas.drawRightString(A4[0] - 38, 25, str(doc.page))


story = []
for line in SOURCE.read_text().splitlines():
    if not line.strip():
        continue
    if line.startswith("### Job Search Dispatch"):
        story.append(PageBreak())
    if line.startswith("# "):
        kind, text = "name", line[2:]
    elif line.startswith("## "):
        kind, text = "section", line[3:].upper()
    elif line.startswith("### "):
        kind, text = "role", line[4:]
    elif line.startswith("- "):
        kind, text = "bullet", "• " + line[2:]
    else:
        kind, text = "body", line
    story.append(Paragraph(inline(text), styles[kind]))

SimpleDocTemplate(str(TARGET), pagesize=A4, rightMargin=38, leftMargin=38,
                  topMargin=34, bottomMargin=38, title="Yuelin Liu - Software Engineer",
                  author="Yuelin Liu").build(story, onFirstPage=footer, onLaterPages=footer)
shutil.copyfile(TARGET, DIRECTORY / "yuelin-liu-resume.pdf")
