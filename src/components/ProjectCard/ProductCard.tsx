import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectCard = ({ project }: any) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-card rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <img
        src={project?.image}
        alt={project?.name}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{project?.name}</h3>
        <p className="text-sm mb-2">
          <span className="font-semibold"></span>
          {project?.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Link
              className="flex justify-center items-center"
              to={`/projects/${project?._id}`}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
              >
                View More
              </motion.button>
            </Link>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
             
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              View Details
            </motion.button> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
