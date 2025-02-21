import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, Flatten, Dropout
from tensorflow.keras.models import Model
import matplotlib.pyplot as plt
import os

# 📌 Set Dataset Path
DATASET_DIR = "dataset/"  # Change to your dataset path
MODEL_SAVE_PATH = "backend/models/skin_disease_model.h5"

# 📌 Define Image Parameters
IMG_SIZE = (224, 224)  # MobileNetV2 input size
BATCH_SIZE = 32

# 📌 Data Augmentation & Preprocessing
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2  # 20% validation
)

train_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    subset="training"
)

val_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    subset="validation"
)

# 📌 Get Class Names
CLASS_NAMES = list(train_generator.class_indices.keys())
print("Classes:", CLASS_NAMES)

# 📌 Load Pre-trained MobileNetV2 Model (without top layers)
base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights="imagenet")

# 📌 Freeze Pre-trained Layers
base_model.trainable = False

# 📌 Add Custom Layers
x = Flatten()(base_model.output)
x = Dense(512, activation="relu")(x)
x = Dropout(0.3)(x)  # Reduce overfitting
x = Dense(256, activation="relu")(x)
x = Dropout(0.3)(x)
output_layer = Dense(len(CLASS_NAMES), activation="softmax")(x)

# 📌 Create Model
model = Model(inputs=base_model.input, outputs=output_layer)

# 📌 Compile Model
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# 📌 Train Model
EPOCHS = 10  # Adjust as needed
history = model.fit(train_generator, validation_data=val_generator, epochs=EPOCHS)

# 📌 Save Model
os.makedirs("backend/models", exist_ok=True)
model.save(MODEL_SAVE_PATH)
print(f"Model saved to {MODEL_SAVE_PATH}")

# 📌 Plot Training History
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history.history["accuracy"], label="Train Accuracy")
plt.plot(history.history["val_accuracy"], label="Validation Accuracy")
plt.legend()
plt.title("Model Accuracy")

plt.subplot(1, 2, 2)
plt.plot(history.history["loss"], label="Train Loss")
plt.plot(history.history["val_loss"], label="Validation Loss")
plt.legend()
plt.title("Model Loss")
plt.show()
