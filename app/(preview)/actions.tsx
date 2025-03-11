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
      departmentId: "dept5",
      specialty: "脊柱外科",
    },
    {
      id: "doc14",
      name: "蒋医生",
      departmentId: "dept5",
      specialty: "关节外科",
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
      - 你是一个友好的医院预约助手
      - 你可以帮助用户分析症状，推荐科室，查看医生，预约时间
      - 使用礼貌、专业的语气回复
      - 回复使用中文

         科室ID对照表（当用户描述症状时，使用这些ID调用viewDepartment工具）：
    - 当用户描述头晕、恶心、血压低、胸痛、呼吸困难、消化问题等症状时，使用departmentId="dept1"(内科)
    - 当用户描述需要手术、外伤、肿瘤等症状时，使用departmentId="dept2"(外科)
    - 当用户描述儿童相关症状或患者是儿童时，使用departmentId="dept3"(儿科)
    - 当用户描述妇科问题、怀孕或生育相关问题时，使用departmentId="dept4"(妇产科)
    - 当用户描述骨折、关节痛、脊椎问题等症状时，使用departmentId="dept5"(骨科)
    - 当用户描述头痛、神经问题、记忆力问题等症状时，使用departmentId="dept6"(神经科)
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
