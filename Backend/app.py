from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
# Uncomment these imports when you want to use the full functionality
import zipfile
import shutil
import face_recognition

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MATCHED_FOLDER'] = 'matched'
app.config['UNMATCHED_FOLDER'] = 'unmatched'

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['MATCHED_FOLDER'], exist_ok=True)
os.makedirs(app.config['UNMATCHED_FOLDER'], exist_ok=True)

# Commented out functions for future use

def extract_images(zip_path, extract_to='extracted_images'):
    if not os.path.exists(extract_to):
        os.makedirs(extract_to)
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)
    return [os.path.join(extract_to, file) for file in os.listdir(extract_to) if file.lower().endswith(('.png', '.jpg', '.jpeg'))]

def load_and_encode_reference_image(reference_image_path):
    reference_image = face_recognition.load_image_file(reference_image_path)
    face_encodings = face_recognition.face_encodings(reference_image)
    if len(face_encodings) != 1:
        raise ValueError(f"Reference image should contain exactly one face, found {len(face_encodings)}")
    return face_encodings[0]

def find_matching_images(reference_encoding, image_paths, tolerance=0.6):
    matching_images = []
    unmatched_images = []
    for image_path in image_paths:
        image = face_recognition.load_image_file(image_path)
        face_encodings = face_recognition.face_encodings(image)
        match_found = False
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces([reference_encoding], face_encoding, tolerance=tolerance)
            if matches[0]:
                matching_images.append(image_path)
                match_found = True
                break
        if not match_found:
            unmatched_images.append(image_path)
    return matching_images, unmatched_images

def save_images(image_paths, dest_folder):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
    for image_path in image_paths:
        shutil.copy(image_path, dest_folder)


@app.route('/segregate', methods=['POST'])
def segregate_images():
    if 'reference_image' not in request.files or 'zip_file' not in request.files:
        return jsonify({'error': 'Both reference_image and zip_file are required'}), 400
    
    reference_image = request.files['reference_image']
    zip_file = request.files['zip_file']

    if reference_image.filename == '' or zip_file.filename == '':
        return jsonify({'error': 'Both files must have a valid filename'}), 400
    
    # Secure filenames and save files
    reference_image_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(reference_image.filename))
    zip_file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(zip_file.filename))
    
    reference_image.save(reference_image_path)
    zip_file.save(zip_file_path)

    # New: Print file sizes for debugging
    ref_size = os.path.getsize(reference_image_path)
    zip_size = os.path.getsize(zip_file_path)
    


    try:
        # Extract images from zip file
        extract_to = os.path.join(app.config['UPLOAD_FOLDER'], 'extracted_images')
        image_paths = extract_images(zip_file_path, extract_to)
        
        # Load and encode reference image
        reference_encoding = load_and_encode_reference_image(reference_image_path)
        
        # Find matching images
        matching_images, unmatched_images = find_matching_images(reference_encoding, image_paths)
        
        # Save images to matched and unmatched folders
        save_images(matching_images, app.config['MATCHED_FOLDER'])
        save_images(unmatched_images, app.config['UNMATCHED_FOLDER'])

        return jsonify({
            'matched': [os.path.basename(path) for path in matching_images],
            'unmatched': [os.path.basename(path) for path in unmatched_images]
        })
    
    except ValueError as e:
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    app.run(debug=True)