from PIL import Image
import os

def compress_image(input_path, output_path, target_size_kb=20):
    try:
        # Open the image
        img = Image.open(input_path)

        # Calculate the target size in bytes
        target_size_bytes = target_size_kb * 1024

        # Reduce the image quality while keeping the aspect ratio
        img.save(output_path, optimize=True, quality=85)

        # Check if the output file size is within the target range
        while os.path.getsize(output_path) > target_size_bytes:
            img.save(output_path, optimize=True, quality=75)

        print(f"Compressed image saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    input_image_path = "input_image.jpg"  # Replace with your input image path
    output_image_path = "compressed_image.jpg"  # Replace with your desired output path
    compress_image(input_image_path, output_image_path)
