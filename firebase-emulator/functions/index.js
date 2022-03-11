// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp()
// const spawn = require('child-process-promise').spawn;
// const path = require('path');
// const os = require('os');
// const fs = require('fs');

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.generateImages = functions.storage.object().onFinalize(async (object) => {
//   const fileBucket = object.bucket; // The Storage bucket that contains the file.
//   const filePath = object.name; // File path in the bucket.
//   const contentType = object.contentType; // File content type.

//   if (!contentType.startsWith('image/')) {
//     return functions.logger.log('This is not an image');
//   }

//   // Get the file name.
//   const fileName = path.basename(filePath);

//   // Exit if the image is not the original
//   if (!fileName.startsWith('original_')) {
//     return functions.logger.log('This image is not the original');
//   }

//   // Download file from bucket.
//   const bucket = admin.storage().bucket(fileBucket);
//   const tempFilePath = path.join(os.tmpdir(), fileName);
//   const metadata = {
//     contentType: contentType,
//   };

//   await bucket.file(filePath).download({destination: tempFilePath, validation: !process.env.FUNCTIONS_EMULATOR,});

//   // Generate a thumbnail using ImageMagick.
//   await spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);

//   // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
//   const thumbFileName = `thumb_${fileName}`;
//   const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

//   // Uploading the thumbnail.
//   await bucket.upload(tempFilePath, {
//     destination: thumbFilePath,
//     metadata: metadata,
//   });

//   // Once the thumbnail has been uploaded delete the local file to free up disk space.
//   return fs.unlinkSync(tempFilePath);
// });
