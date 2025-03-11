import { Message, TextStreamMessage } from "@/components/message";
import { deepseek } from "@ai-sdk/deepseek";
import { CoreMessage, generateId } from "ai";
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { ReactNode } from "react";
import { z } from "zod";
import { DepartmentView } from "@/components/department-view";
import { DoctorListView } from "@/components/doctor-list-view";
import { TimeSlotView } from "@/components/time-slot-view";
import { AppointmentConfirmationView } from "@/components/appointment-view";

export interface Hospital {
  departments: Array<{ id: string; name: string; description: string }>;
  doctors: Array<{
    id: string;
    name: string;
    departmentId: string;
    specialty: string;
  }>;
  availableSlots: Array<{
    doctorId: string;
    date: string;
    times: Array<string>;
  }>;
  appointments: Array<{
    id: string;
    patientName: string;
    doctorId: string;
    date: string;
    time: string;
  }>;
}

let hospital: Hospital = {
  departments: [
    { id: "dept1", name: "内科", description: "处理内部器官疾病" },
    { id: "dept2", name: "外科", description: "处理需要手术的疾病" },
    { id: "dept3", name: "儿科", description: "专门针对儿童的医疗服务" },
    { id: "dept4", name: "妇产科", description: "女性健康和生育相关服务" },
    { id: "dept5", name: "骨科", description: "骨骼和肌肉系统疾病" },
    { id: "dept6", name: "神经科", description: "处理神经系统疾病" },
    { id: "dept7", name: "眼科", description: "处理眼部疾病和视力问题" },
  ],
  doctors: [
    {
      id: "doc1",
      name: "张医生",
      departmentId: "dept1",
      specialty: "心脏内科",
    },
    {
      id: "doc2",
      name: "李医生",
      departmentId: "dept1",
      specialty: "消化内科",
    },
    {
      id: "doc3",
      name: "王医生",
      departmentId: "dept1",
      specialty: "呼吸内科",
    },
    {
      id: "doc4",
      name: "赵医生",
      departmentId: "dept1",
      specialty: "神经内科",
    },
    {
      id: "doc5",
      name: "刘医生",
      departmentId: "dept1",
      specialty: "内分泌科",
    },
    {
      id: "doc6",
      name: "陈医生",
      departmentId: "dept2",
      specialty: "普通外科",
    },
    { id: "doc7", name: "杨医生", departmentId: "dept2", specialty: "胸外科" },
    {
      id: "doc8",
      name: "吴医生",
      departmentId: "dept2",
      specialty: "泌尿外科",
    },
    {
      id: "doc9",
      name: "郑医生",
      departmentId: "dept3",
      specialty: "儿童内科",
    },
    {
      id: "doc10",
      name: "周医生",
      departmentId: "dept3",
      specialty: "儿童外科",
    },
    { id: "doc11", name: "孙医生", departmentId: "dept4", specialty: "产科" },
    { id: "doc12", name: "钱医生", departmentId: "dept4", specialty: "妇科" },
    {
      id: "doc13",
      name: "冯医生",
      departmentId: "dept6",
      specialty: "神经内科",
    },
    {
      id: "doc14",
      name: "蒋医生",
      departmentId: "dept6",
      specialty: "神经内科",
    },
    {
      id: "doc15",
      name: "沈医生",
      departmentId: "dept6",
      specialty: "神经内科",
    },
    { id: "doc16", name: "韩医生", departmentId: "dept7", specialty: "眼科" },
  ],
  availableSlots: [
    {
      doctorId: "doc1",
      date: "2025-03-10",
      times: ["09:00", "10:00", "14:00", "15:00"],
    },
    {
      doctorId: "doc1",
      date: "2025-03-11",
      times: ["09:00", "11:00", "14:00"],
    },
    {
      doctorId: "doc2",
      date: "2025-03-10",
      times: ["10:00", "11:00", "15:00", "16:00"],
    },
    {
      doctorId: "doc3",
      date: "2025-03-10",
      times: ["09:00", "10:00", "14:00"],
    },
    {
      doctorId: "doc4",
      date: "2025-03-11",
      times: ["09:00", "10:00", "15:00"],
    },
    {
      doctorId: "doc5",
      date: "2025-03-12",
      times: ["14:00", "15:00", "16:00"],
    },
    {
      doctorId: "doc6",
      date: "2025-03-10",
      times: ["09:00", "10:00", "11:00"],
    },
    {
      doctorId: "doc7",
      date: "2025-03-11",
      times: ["14:00", "15:00", "16:00"],
    },
    {
      doctorId: "doc8",
      date: "2025-03-12",
      times: ["09:00", "10:00", "11:00", "14:00"],
    },
    {
      doctorId: "doc9",
      date: "2025-03-10",
      times: ["14:00", "15:00", "16:00"],
    },
    {
      doctorId: "doc10",
      date: "2025-03-11",
      times: ["09:00", "10:00", "11:00"],
    },
    {
      doctorId: "doc11",
      date: "2025-03-10",
      times: ["14:00", "15:00", "16:00"],
    },
    {
      doctorId: "doc12",
      date: "2025-03-11",
      times: ["09:00", "10:00", "11:00"],
    },
    {
      doctorId: "doc13",
      date: "2025-03-12",
      times: ["14:00", "15:00", "16:00"],
    },
    {
      doctorId: "doc14",
      date: "2025-03-10",
      times: ["09:00", "10:00", "11:00"],
    },
    {
      doctorId: "doc15",
      date: "2025-03-11",
      times: ["14:00", "15:00", "16:00"],
    },
    {
      doctorId: "doc16",
      date: "2025-03-12",
      times: ["09:00", "10:00", "11:00", "14:00"],
    },
  ],
  appointments: [],
};

const sendMessage = async (message: string) => {
  "use server";

  const messages = getMutableAIState<typeof AI>("messages");

  messages.update([
    ...(messages.get() as CoreMessage[]),
    { role: "user", content: message },
  ]);

  const contentStream = createStreamableValue("");
  const textComponent = <TextStreamMessage content={contentStream.value} />;

  const { value: stream } = await streamUI({
    model: deepseek("deepseek-chat"),
    system: `\
    - 你是智医助手，一个智能医疗咨询伙伴
    - 你可以帮助用户分析症状、提供初步健康指导，并为用户推荐合适的专科医生
    - 请遵循以下对话流程：
      1. 当用户首次描述症状时，不要立即调用任何工具，而是先详细分析可能的原因
      2. 询问补充信息，如症状持续时间、位置、严重程度等
      3. 当用户提供更多信息后，给出生活方式建议和初步健康指导
      4. 只有当用户明确要求推荐医生时，才调用相关工具推荐科室，然后推荐医生
    
    - 对于头痛症状的初次咨询，请回复类似以下内容：
      "感谢您提供的详细信息。根据您描述的情况，您的头痛可能与多个因素相关：
      长时间面对电脑工作可能导致视觉疲劳和颈部紧张
      不规律的作息和睡眠不足会影响身体恢复
      过量咖啡因摄入可能引起血压波动和加重头痛
      高血压如控制不佳也可能是诱因之一
      为了更全面地了解您的情况，我想进一步询问：
      头痛是持续性的还是间歇性的？主要疼痛位置在哪里？
      除了头痛和头晕，有无恶心、视力模糊等其他症状？
      头痛是最近才出现的新症状，还是长期存在但最近加重？
      家族中是否有人有类似的头痛问题或其他慢性疾病？"
    
    - 当用户提供更多症状信息后，请回复类似以下内容：
      "非常感谢您的补充。现在我对您的情况有了更清晰的认识。您的头痛很可能是多因素共同作用的结果：
      职业相关因素：程序员长时间面对电脑工作导致的视觉疲劳和颈部紧张
      生活习惯因素：睡眠不足、咖啡摄入过量、缺乏运动
      基础健康状况：高血压病史和可能的家族遗传倾向
      在您寻求专业医疗帮助前，可以考虑：
      遵循"20-20-20法则"：每20分钟看远处20秒，减轻眼睛疲劳
      每工作1小时起身活动5-10分钟，做些简单的颈部伸展
      减少咖啡摄入，尤其是下午后
      确保规律作息，避免长时间熬夜
      在我为您推荐专科医生前，请问您还有其他健康问题或需要补充的信息吗？"
    
    - 只有当用户明确表示"请推荐医生"或类似请求时，才调用viewDepartment工具
    - 使用专业、关怀的语气，但避免做出确定的诊断
    - 提醒用户你提供的信息仅供参考，不能替代专业医生的面诊
    - 回复使用中文
    
    科室ID对照表（对应viewDepartment 工具）：
    - 对于头痛、头晕、神经系统症状，使用departmentId="dept6"(神经科)
    - 对于高血压、心脏问题，使用departmentId="dept1"(内科)
    - 当用户描述需要手术、外伤、肿瘤等症状时，使用departmentId="dept2"(外科)
    - 当用户描述儿童相关症状或患者是儿童时，使用departmentId="dept3"(儿科)
    - 当用户描述妇科问题、怀孕或生育相关问题时，使用departmentId="dept4"(妇产科)
    - 当用户描述骨折、关节痛、脊椎问题等症状时，使用departmentId="dept5"(骨科)
    - 当用户描述眼睛问题、视力模糊等症状时，使用departmentId="dept7"(眼科)
    
    医生ID对照表（当用户询问特定医生时，使用这些ID调用viewDoctorAvailability工具）：
    - 张医生: doctorId="doc1" (心脏内科)
    - 李医生: doctorId="doc2" (消化内科)
    - 王医生: doctorId="doc3" (呼吸内科)
    - 赵医生: doctorId="doc4" (神经内科)
    - 刘医生: doctorId="doc5" (内分泌科)
    - 陈医生: doctorId="doc6" (普通外科)
    - 杨医生: doctorId="doc7" (胸外科)
    - 吴医生: doctorId="doc8" (泌尿外科)
    - 郑医生: doctorId="doc9" (儿童内科)
    - 周医生: doctorId="doc10" (儿童外科)
    - 孙医生: doctorId="doc11" (产科)
    - 钱医生: doctorId="doc12" (妇科)
    - 冯医生: doctorId="doc13" (脊柱外科)
    - 蒋医生: doctorId="doc14" (关节外科)
    - 沈医生: doctorId="doc15" (神经内科)
    - 韩医生: doctorId="doc16" (眼科)
    
    对于头痛症状，当用户请求推荐医生时，应优先推荐神经科(dept6)的医生，如沈医生(doc15)或神经内科(dept1)的赵医生(doc4)
  `,
    messages: messages.get() as CoreMessage[],
    text: async function* ({ content, done }) {
      if (done) {
        messages.done([
          ...(messages.get() as CoreMessage[]),
          { role: "assistant", content },
        ]);

        contentStream.done();
      } else {
        contentStream.update(content);
      }

      return textComponent;
    },
    tools: {
      viewDepartment: {
        description: "显示推荐科室信息",
        parameters: z.object({
          departmentId: z.string(),
        }),
        generate: async function* ({ departmentId }) {
          // 从hospital数据中获取科室信息
          const department = hospital.departments.find(
            (d) => d.id === departmentId
          );

          // 计算该科室的医生数量
          const doctorCount = hospital.doctors.filter(
            (d) => d.departmentId === departmentId
          ).length;

          const toolCallId = generateId();

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "viewDepartment",
                  args: { departmentId },
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "viewDepartment",
                  toolCallId,
                  result: `显示科室信息：${department?.name}`,
                },
              ],
            },
          ]);

          return (
            <Message
              role="assistant"
              content={
                <DepartmentView
                  department={department!}
                  doctorCount={doctorCount}
                />
              }
            />
          );
        },
      },
      viewDoctorsByDepartment: {
        description: "显示特定科室的医生列表",
        parameters: z.object({
          departmentId: z.string(),
        }),
        generate: async function* ({ departmentId }) {
          // 从hospital数据中获取科室信息
          const department = hospital.departments.find(
            (d) => d.id === departmentId
          );

          // 获取该科室的所有医生
          const doctors = hospital.doctors.filter(
            (d) => d.departmentId === departmentId
          );

          const toolCallId = generateId();

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "viewDoctorsByDepartment",
                  args: { departmentId },
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "viewDoctorsByDepartment",
                  toolCallId,
                  result: `显示${department?.name}的医生列表`,
                },
              ],
            },
          ]);

          return (
            <Message
              role="assistant"
              content={
                <DoctorListView
                  doctors={doctors}
                  departmentName={department?.name || "内科"}
                />
              }
            />
          );
        },
      },
      viewDoctorAvailability: {
        description: "显示医生的可用时间",
        parameters: z.object({
          doctorId: z.string(),
        }),
        generate: async function* ({ doctorId }) {
          // 从hospital数据中获取医生信息
          const doctor = hospital.doctors.find((d) => d.id === doctorId);

          // 获取该医生的所有可用时间段
          const availableSlots = hospital.availableSlots.filter(
            (slot) => slot.doctorId === doctorId
          );

          const toolCallId = generateId();

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "viewDoctorAvailability",
                  args: { doctorId },
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "viewDoctorAvailability",
                  toolCallId,
                  result: `显示${doctor?.name}的可用时间`,
                },
              ],
            },
          ]);

          return (
            <Message
              role="assistant"
              content={
                <TimeSlotView
                  doctor={doctor!}
                  availableSlots={availableSlots}
                />
              }
            />
          );
        },
      },
      bookAppointment: {
        description: "预约医生",
        parameters: z.object({
          doctorId: z.string(),
          date: z.string(),
          time: z.string(),
          patientName: z.string().optional(),
        }),
        generate: async function* ({
          doctorId,
          date,
          time,
          patientName = "患者",
        }) {
          // 从hospital数据中获取医生信息
          const doctor = hospital.doctors.find((d) => d.id === doctorId);

          // 获取科室信息
          const department = hospital.departments.find(
            (d) => d.id === doctor?.departmentId
          );

          // 创建新预约
          const appointmentId = `appt-${Date.now()}`;
          hospital.appointments.push({
            id: appointmentId,
            patientName,
            doctorId,
            date,
            time,
          });

          const toolCallId = generateId();

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "bookAppointment",
                  args: { doctorId, date, time, patientName },
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "bookAppointment",
                  toolCallId,
                  result: `预约成功：${doctor?.name}, ${date} ${time}`,
                },
              ],
            },
          ]);

          // 构建预约确认信息
          const appointmentInfo = {
            doctorName: doctor?.name,
            departmentName: department?.name,
            date,
            time,
            patientName,
          };

          return (
            <Message
              role="assistant"
              content={
                <AppointmentConfirmationView
                  appointment={appointmentInfo as any}
                />
              }
            />
          );
        },
      },
      viewAppointments: {
        description: "查看当前预约",
        parameters: z.object({}),
        generate: async function* ({}) {
          // 获取所有预约信息
          const appointments = hospital.appointments;

          // 如果没有预约
          if (appointments.length === 0) {
            const toolCallId = generateId();

            messages.done([
              ...(messages.get() as CoreMessage[]),
              {
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolCallId,
                    toolName: "viewAppointments",
                    args: {},
                  },
                ],
              },
              {
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "viewAppointments",
                    toolCallId,
                    result: `没有找到任何预约记录`,
                  },
                ],
              },
            ]);

            return (
              <Message role="assistant" content="您目前没有任何预约记录。" />
            );
          }

          // 获取最新的预约
          const latestAppointment = appointments[appointments.length - 1];
          const doctor = hospital.doctors.find(
            (d) => d.id === latestAppointment.doctorId
          );
          const department = hospital.departments.find(
            (d) => d.id === doctor?.departmentId
          );

          const appointmentInfo = {
            doctorName: doctor?.name,
            departmentName: department?.name,
            date: latestAppointment.date,
            time: latestAppointment.time,
            patientName: latestAppointment.patientName,
          };

          const toolCallId = generateId();

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "viewAppointments",
                  args: {},
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "viewAppointments",
                  toolCallId,
                  result: `找到预约记录：${doctor?.name}, ${latestAppointment.date} ${latestAppointment.time}`,
                },
              ],
            },
          ]);

          return (
            <Message
              role="assistant"
              content={
                <AppointmentConfirmationView
                  appointment={appointmentInfo as any}
                />
              }
            />
          );
        },
      },
    },
  });

  return stream;
};

export type UIState = Array<ReactNode>;

export type AIState = {
  chatId: string;
  messages: Array<CoreMessage>;
};

export const AI = createAI<AIState, UIState>({
  initialAIState: {
    chatId: generateId(),
    messages: [],
  },
  initialUIState: [],
  actions: {
    sendMessage,
  },
  onSetAIState: async ({ state, done }) => {
    "use server";

    if (done) {
      // save to database
    }
  },
});
