const { default: mongoose } = require("mongoose");

const blogSchema = mongoose.Schema({
    titre: {
        type: String,
        // uppercase: true,
        trim: true,
        minlenght:10,
        maxlenght: 100,
        validate: {
            validator: (v) => v.charAt(0) === v.charAt(0).toUpperCase(),
            message: (props) => `${props.value} ne commence pas par une majuscule`
        }
    },
    description: String,
    isArchive: {
        type: Boolean,
        default: false
    },
    openedNumber: Number,
    category: [String],
    featuredBlog: mongoose.Types.ObjectId,
    author: {
        name: String,
        address: String,
    },
    created: {
        type: Date,
        default: new Date()
    }
})

const modelBlog = mongoose.model('Blog', blogSchema);

module.exports = modelBlog;