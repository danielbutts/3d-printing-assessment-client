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
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '../uploads');
  form.on('file', (field, file) => {
    fs.renameSync(file.path, path.join(form.uploadDir, file.name));
    const input = fs.createReadStream(path.join(form.uploadDir, file.name));
    const parser = parse({ columns: true }, (err, data) => {
      const uploadQueries = [];
      data.forEach((row) => {
        let { name, width, depth, height, volume, turnaround,
            price, quantity, strength, materialType } = row;
        if (row.name !== undefined) { name = row.name; }
        if (row.width !== undefined) { width = numberOrNull(row.width); }
        if (row.depth !== undefined) { depth = numberOrNull(row.depth); }
        if (row.height !== undefined) { height = numberOrNull(row.height); }
        if (row.volume !== undefined) { volume = numberOrNull(row.volume); }
        if (row.turnaround !== undefined) { turnaround = numberOrNull(row.turnaround); }
        if (row.price !== undefined) { price = numberOrNull(row.price); }
        if (row.quantity !== undefined) { quantity = numberOrNull(row.quantity); }
        if (row.strength !== undefined) { strength = booleanOrFalse(row.strength); }
        if (row.materialType !== undefined) { materialType = row.materialType; }

        const part = {
          userId: numberOrNull(req.userId),
          name,
          width,
          depth,
          height,
          volume,
          maxTurnaround: turnaround,
          price,
          orderSize: quantity,
          strengthCritical: strength,
          materialType,
          uploaded: true,
        };

        const options = {
          method: 'POST',
          uri: `${API_URL}/parts/upload`,
          headers: {
            authorization: req.token,
          },
          body: part,
          json: true,
        };

        uploadQueries.push(rp(options).catch(() => { // eslint-disable-line arrow-body-style
          return { error: true, part };
        }));
      });

      Promise.all(uploadQueries).then(() => {})
      .catch((error) => {
        next(error);
      });
    });
    input.pipe(parser);
  });
  // log any errors that occur
  form.on('error', (err) => {
    next(err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    res.status(200).json({ message: 'File(s) sucessfully uploaded.' });
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

function booleanOrFalse(bool) {
  return (bool.toLowerCase() === 'true');
}

module.exports = router;
