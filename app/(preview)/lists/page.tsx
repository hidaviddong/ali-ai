import { AppointmentConfirmationView } from "@/components/appointment-view";
import { DepartmentView } from "@/components/department-view";
import { DoctorListView } from "@/components/doctor-list-view";
import { TimeSlotView } from "@/components/time-slot-view";

export default function Page() {
  const internalMedicineDept = {
    id: "dept1",
    name: "内科",
    description: "处理内部器官疾病，包括心脏、肺、胃肠等系统疾病",
  };

  const doctor = {
    id: "doc1",
    name: "张医生",
    specialty: "心脏内科",
  };

  // 模拟可用时间段
  const availableSlots = [
    {
      date: "2025-03-10",
      times: ["09:00", "10:00", "14:00", "15:00"],
    },
    {
      date: "2025-03-11",
      times: ["09:00", "11:00", "14:00"],
    },
  ];

  // 内科医生数量
  const internalMedicineDoctorCount = 5; // 基于您之前的数据模型

  const internalMedicineDoctors = [
    { id: "doc1", name: "张医生", specialty: "心脏内科" },
    { id: "doc2", name: "李医生", specialty: "消化内科" },
    { id: "doc3", name: "王医生", specialty: "呼吸内科" },
    { id: "doc4", name: "赵医生", specialty: "神经内科" },
    { id: "doc5", name: "刘医生", specialty: "内分泌科" },
  ];

  const appointment = {
    doctorName: "张医生",
    departmentName: "内科",
    date: "2025-03-10",
    time: "09:00",
    patientName: "王小明",
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">组件预览</h1>

      <DepartmentView
        department={internalMedicineDept}
        doctorCount={internalMedicineDoctorCount}
      />
      <DoctorListView doctors={internalMedicineDoctors} departmentName="内科" />
      <TimeSlotView doctor={doctor} availableSlots={availableSlots} />
      <AppointmentConfirmationView appointment={appointment} />
    </div>
  );
}
