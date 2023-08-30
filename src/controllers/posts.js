const Post = require("../model/postModel");
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')
const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('createdAt');
  res.status(StatusCodes.OK).json({ count:posts.length,posts });
};
const getUserPosts = async (req, res) => {
  const posts = await Post.find({createdBy:req.user.id}).sort('createdAt');
  res.status(StatusCodes.OK).json({ count:posts.length,posts  });
};
const addPost = async (req, res) => {
  // res.json(req.body)
  req.body.createdBy = req.user.id
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).send({ post });
};
const getPost = async (req, res) => {
  const { user:{id: UserId},params:{id: PostId} } = req;
  const post = await Post.findOne({ _id: PostId,createdBy:UserId });
  if (!post) {
    throw new NotFoundError(`No post found with id ${PostId}`)
  }
  res.status(StatusCodes.OK).json({ post });
};
const updatePost = async (req, res) => {
  const { 
    // body:{},
    user:{id:UserId},
    params:{id: PostId},
   } = req;
  const post = await Post.findOneAndUpdate({ _id: PostId,createdBy:UserId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    throw new NotFoundError(`No post found with id ${PostId}`)
  }
  res.status(StatusCodes.OK).json({ post });
};
const deletePost = async (req, res) => {
  const { 
    user:{id:UserId},
    params:{id: PostId},
   } = req;
  const post = await Post.findOneAndDelete({ _id:PostId,createdBy:UserId});
  if (!post) {
    throw new NotFoundError(`No post found with id ${PostId}`)
  }
  res.status(StatusCodes.OK).send()
};
const getPrivate = async (req, res) => {
  const posts = await Post.find({ visibility: false });
  res.status(201).json({ count:posts.length,posts  });
};
const getPublic = async (req, res) => {
  const posts = await Post.find({ visibility: true });
  res.status(201).json({ count:posts.length,posts  });
};
const getBookmark = async (req, res) => {
  const posts = await Post.find({ bookmark: true });
  res.status(201).json({ count:posts.length,posts  });
};
const getLiked = async (req, res) => {
  const posts = await Post.find({ like: true });
  res.status(201).json({ count:posts.length,posts  });
};
const deleteAll = async(req,res) => {
    const posts = await Post.deleteMany({})
    res.status(201).json({posts})
}
const getSearch = async(req,res) => {
  const {title,visibility,totalLikes,sort,fields,numericFilters} = req.query
  const queryObj = {}
  if(title){
    queryObj.title={$regex: title,$options:'i'}
  }
  if(visibility){
    queryObj.visibility= visibility==='true'?true:false;
  }
  if(totalLikes){
    queryObj.totalLikes= totalLikes;
  }
  if(numericFilters){
    const operatorMap = {
      '<':'$lt',
      '<=':'$lte',
      '=':'$eq',
      '>':'$gt',
      '>=':'$gte',
    }
    const RegEx = /\b(<|>|>=|=|<=)\b/g
    let filters = numericFilters.replace(RegEx,(match) => `-${operatorMap[match]}-`)
    const options = ['totalLikes']
    filters = filters.split(',').forEach((item) => {
      const [field,operator,value] = item.split('-')
      if(options.includes(field)){
        queryObj[field] = {[operator]:Number(value)}
      }
    })
  }
  let result = Post.find(queryObj)
  if(sort){
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }else{
    result = result.sort('createdAt')
  }
  if(fields){
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 60
  const skip = (page-1)*limit
  result = result.skip(skip).limit(limit)
  const posts = await result
  res.status(200).json({posts})
}
module.exports = {
  getAllPosts,
  getUserPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
  getPrivate,
  getPublic,
  getBookmark,
  getLiked,
  getSearch,
  deleteAll,
};
