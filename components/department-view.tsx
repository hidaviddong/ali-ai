"use client";

import { motion } from "framer-motion";

// 定义组件的props类型
interface DepartmentViewProps {
  department: {
    id: string;
    name: string;
    description: string;
  };
  doctorCount: number;
}

export const DepartmentView = ({
  department,
  doctorCount,
}: DepartmentViewProps) => {
  return (
    <div className="flex flex-col gap-3 md:max-w-[452px] max-w-[calc(100dvw-80px)] w-full pb-6">
      {/* 科室标题 */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          推荐科室
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          根据您的症状，我们推荐以下科室
        </p>
      </motion.div>

      {/* 主要推荐科室卡片 */}
      <motion.div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg">
              {/* 使用简单的文本代替图标 */}
              <span className="text-lg font-bold">+</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">
                {department.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {department.description}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  目前可预约
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {doctorCount} 位医生在诊
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-gray-50 dark:bg-zinc-700/30 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            建议就诊科室
          </span>
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            查看医生 →
          </button>
        </div>
      </motion.div>

      {/* 其他可能相关科室 */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          其他可能相关科室
        </h4>
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm text-gray-700 dark:text-gray-300">
            神经内科
          </div>
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm text-gray-700 dark:text-gray-300">
            心理科
          </div>
          <div className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm text-gray-700 dark:text-gray-300">
            心血管内科
          </div>
        </div>
      </motion.div>
    </div>
  );
};
