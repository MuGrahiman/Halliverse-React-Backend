import UserModel from "./Models/user.js";
import TeamModel from "./Models/team.js";
import dotenv from "dotenv";

dotenv.config();

export const fetchAllUser = async (req, res) => {
  const PAGE_SIZE = process.env.NO_OF_DATA;
  const PAGE = parseInt(req.query.pageNo) || 1;

  try {
    const TOTALUSERS = await UserModel.countDocuments({});
    const TOTALPAGES = Math.ceil(TOTALUSERS / PAGE_SIZE);

    console.log("in the fetch field");
    const skip = (PAGE - 1) * PAGE_SIZE;

    const users = await UserModel.find().skip(skip).limit(parseInt(PAGE_SIZE));

    return res.json({ users, TOTALPAGES });
  } catch (error) {}
};
export const fetchUserById = async (req, res) => {
  console.log("in the fetchUserById field");
  const id = req.params.id;
  console.log(id);
  try {
    const user = await UserModel.findById(id);
    console.log(user);

    return res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

// In your routes file
export const fetchUserBySearchQuery = async (req, res) => {
  console.log("in the fetchUserBySearchQuery field");
  try {
    const PAGE_SIZE = process.env.NO_OF_DATA;
    const PAGE = parseInt(req.query.pageNo) || 1;
    const skip = (PAGE - 1) * PAGE_SIZE;

    const searchQuery = req.query.searchQuery; // Update the variable name to match the query parameter
    console.log(searchQuery);

    let query = {};

    if (searchQuery) {
      query = {
        $or: [
          { first_name: { $regex: new RegExp(searchQuery, "i") } },
          { last_name: { $regex: new RegExp(searchQuery, "i") } },
        ],
      };
    }

    const users = await UserModel.find(query).skip(skip).limit(PAGE_SIZE);
    console.log(users);

    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// export const fetchUserByFilter = async(req,res)=>{
// console.log(result)
// res.json(result)
// }
export const fetchUserByFilter = async (req, res) => {
  console.log("in the fetchUserByFilter function");
  try {
    const PAGE_SIZE = process.env.NO_OF_DATA;
    const PAGE = parseInt(req.query.pageNo) || 1;
    const skip = (PAGE - 1) * PAGE_SIZE;

    let query = {};

    const { filterOptions, sortOption, availableOption } = req.query; // Assuming filterOptions is an array of filter options
    console.log(filterOptions, sortOption,availableOption);

    try {
      if (filterOptions && filterOptions.length > 0) {
        query = {
          ...query,
          domain: { $in: filterOptions }, // Filtering by domain based on the filter options
        };
      }
      if (sortOption) {
        query = {
          ...query,
          gender: sortOption, // Filtering by gender based on the provided gender string
        };
      }
      if (availableOption) {
        query = {
          ...query,
          available: availableOption, // Filtering by gender based on the provided gender string
        };
      }

      const users = await UserModel.find(query).skip(skip).limit(PAGE_SIZE);
      // console.log(users);
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTeam =async (req, res) => {
  try {
    const result = await  TeamModel.find({}).populate('TeamData')
    // TeamModel.find({}) 
    // .populate({
    //   path: 'TeamData', 
    //   model: UserModel, 
    //   options: { lean: true } 
    // }).then(newTeam=>console.log(newTeam[0].TeamData))
    // console.log(newTeam);
    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const postTeam =async (req, res) => {
  try {
    const team = req.body; 
    const newTeam = new TeamModel(); 
    team.forEach(id => {
      newTeam.TeamData.push( id );
    });
    let result =await newTeam.save()
    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
