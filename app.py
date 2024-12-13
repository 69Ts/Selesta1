import os
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Папка для сохранения загруженных изображений
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Разрешённые расширения файлов
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Главная страница с формой загрузки
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            return redirect(url_for('display_image', filename=filename))
    return render_template('upload.html')

# Отображение загруженного изображения с эффектами
@app.route('/image/<filename>')
def display_image(filename):
    return render_template('index.html', filename=filename)

if __name__ == "__main__":
    # Используем порт, предоставленный Render
    port = int(os.environ.get('PORT', 5000))  # По умолчанию 5000
    app.run(host="0.0.0.0", port=port)
