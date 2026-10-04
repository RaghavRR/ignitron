const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    coverImage: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    category: { type: String, enum: ['Robotics', 'AI', 'IoT', 'Electronics'], required: true },
    technologies: [{ type: String }],
    skills: [{ type: String }],
    timeRequired: { type: String, default: '' },
    overview: { type: String, required: true },
    whatYouLearn: [{ type: String }],
    components: [
      {
        name: String,
        quantity: String,
        image: String,
      },
    ],
    circuitDiagram: { type: String, default: '' },
    howToMake: [{ type: String }],
    code: { type: String, default: '' },
    codeLanguage: { type: String, default: 'cpp' },
    videoUrl: { type: String, default: '' },
    troubleshooting: [
      {
        issue: String,
        fix: String,
      },
    ],
    challenge: { type: String, default: '' },
    upgradeIdeas: [{ type: String }],
    relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', technologies: 'text', skills: 'text' });

module.exports = mongoose.model('Project', projectSchema);
