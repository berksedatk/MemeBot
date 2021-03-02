const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
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
