"use client";

import { motion } from "framer-motion";

// 定义组件的props类型
interface TimeSlotViewProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
  };
  availableSlots: Array<{
    date: string;
    times: string[];
  }>;
}

export const TimeSlotView = ({ doctor, availableSlots }: TimeSlotViewProps) => {
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
          {doctor.name}的可用时间
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {doctor.specialty} · 请选择预约时间
        </p>
      </motion.div>

      {/* 日期和时间选择 */}
      {availableSlots.map((slot, slotIndex) => (
        <motion.div
          key={slot.date}
          className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + slotIndex * 0.05 }}
        >
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              {formatDate(slot.date)}
            </h4>

            <div className="grid grid-cols-3 gap-2">
              {slot.times.map((time, timeIndex) => (
                <button
                  key={time}
                  className="px-2 py-2 bg-gray-50 dark:bg-zinc-700/50 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
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
