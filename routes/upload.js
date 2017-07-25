const express = require('express');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const rp = require('request-promise');
const parse = require('csv-parse');
const authUtils = require('../utils/auth-utils');

const router = express.Router();
const API_URL = process.env.API_URL; // e.g. 'http://localhost:8080'

/* eslint no-use-before-define: "off", no-param-reassign: "off", strict: "off" */
router.get('/', authUtils.validateToken, (req, res) => {
  res.render('pages/upload', { username: req.session.username });
});

router.post('/', authUtils.validateToken, (req, res, next) => {
  // create an incoming form object
  const form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', (field, file) => {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    // let parser = parse({ delimiter: ',' });
    const input = fs.createReadStream(path.join(form.uploadDir, file.name));
    const parser = parse({ columns: true }, (err, data) => {
      const posts = [];

      data.forEach((part) => {
        let { width, depth, height, volume, turnaround,
          price, quantity, strength, material } = part;
        if (part.width !== undefined) { width = numberOrNull(part.width); }
        if (part.depth !== undefined) { depth = numberOrNull(part.depth); }
        if (part.height !== undefined) { height = numberOrNull(part.height); }
        if (part.volume !== undefined) { volume = numberOrNull(part.volume); }
        if (part.turnaround !== undefined) { turnaround = numberOrNull(part.turnaround); }
        if (part.price !== undefined) { price = numberOrNull(part.price); }
        if (part.quantity !== undefined) { quantity = numberOrNull(part.quantity); }
        if (part.strength !== undefined) { strength = numberOrNull(part.strength); }
        if (part.material !== undefined) { material = numberOrNull(part.material); }

        const options = {
          method: 'POST',
          uri: `${API_URL}/parts/upload`,
          headers: {
            authorization: req.token,
          },
          data: {
            width, depth, height, volume, turnaround, price, quantity, strength, material,
          },
          json: true,
        };
        posts.push(rp(options).catch(() => 1));
      });
      Promise.all(posts).then((results) => {
        console.log(results);
      })
      .catch((error) => {
        next(error);
      });
      // console.log(data);
    });
    input.pipe(parser);
  });
  // log any errors that occur
  form.on('error', (err) => {
    next(err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    res.status(200).json({ message: 'File(s) sucessfulle uploaded.' });
  });
  // parse the incoming request containing the form data
  form.parse(req);
});

function numberOrNull(num) {
  num += '';
  num = parseInt(num, 10);
  if (isNaN(num)) {
    return null;
  }
  return num;
}

module.exports = router;
