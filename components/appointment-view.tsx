"use client";

import { motion } from "framer-motion";

// 定义组件的props类型
interface AppointmentConfirmationViewProps {
  appointment: {
    doctorName: string;
    departmentName: string;
    date: string;
    time: string;
    patientName?: string;
  };
}

export const AppointmentConfirmationView = ({
  appointment,
}: AppointmentConfirmationViewProps) => {
  return (
    <div className="flex flex-col gap-3 md:max-w-[452px] max-w-[calc(100dvw-80px)] w-full pb-6">
      {/* 标题 */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            预约成功
          </h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          您的预约已确认，以下是预约详情
        </p>
      </motion.div>

      {/* 预约详情卡片 */}
      <motion.div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">
                医生信息
              </h4>
              <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                {appointment.doctorName} · {appointment.departmentName}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">
                预约时间
              </h4>
              <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                {formatDate(appointment.date)} {appointment.time}
              </p>
            </div>

            {appointment.patientName && (
              <div>
                <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">
                  患者姓名
                </h4>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {appointment.patientName}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-zinc-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                请提前15分钟到达医院
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 操作按钮 */}
      <motion.div
        className="flex gap-2 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button className="flex-1 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
          取消预约
        </button>
        <button className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 rounded-lg text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
          添加到日历
        </button>
      </motion.div>
    </div>
  );
};

// 辅助函数：格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
    date.getDay()
  ];

  return `${year}年${month}月${day}日 ${weekday}`;
}
