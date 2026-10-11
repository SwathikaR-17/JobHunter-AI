from app.services.resume_parser import parse_resume


resume_text = """
John Doe
john@example.com

Education:
B.Tech Computer Science

Skills:
Python, Java, Machine Learning

Projects:
AI Resume Analyzer
Job Recommendation System
"""

result = parse_resume(resume_text)

print(result)