const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  epic: Boolean,
  roles: {
    type: Map,
    of: Object
  },
  users: {
    type: Map,
    of: Object
  }
});

module.exports = mongoose.model("stats", statsSchema);
