"use client";

import { motion } from "framer-motion";

// 定义组件的props类型
interface DoctorListViewProps {
  doctors: Array<{
    id: string;
    name: string;
    specialty: string;
  }>;
  departmentName: string;
}

export const DoctorListView = ({
  doctors,
  departmentName,
}: DoctorListViewProps) => {
  return (
    <div className="flex flex-col gap-3 md:max-w-[452px] max-w-[calc(100dvw-80px)] w-full pb-6">
      {/* 标题 */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {departmentName}医生
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          请选择您想要预约的医生
        </p>
      </motion.div>

      {/* 医生列表 */}
      <div className="space-y-3">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-lg font-medium">
                    {doctor.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {doctor.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  查看时间
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
