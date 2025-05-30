import { relations } from "drizzle-orm";
import {
	integer,
	pgEnum,
	pgTable,
	text,
	time,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const patientSexEnum = pgEnum("patient_sex_enum", ["male", "female"]);

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	age: integer("age").notNull(),
	email: text("email").notNull().unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
	clinics: many(usersToClinics),
}));

export const clinics = pgTable("clinics", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updateAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const usersToClinics = pgTable("users_to_clinics", {
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id),
	clinicId: uuid("clinic_id")
		.notNull()
		.references(() => clinics.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const usersToClinicsRelations = relations(usersToClinics, ({ one }) => ({
	user: one(users, {
		fields: [usersToClinics.userId],
		references: [users.id],
	}),
	clinic: one(clinics, {
		fields: [usersToClinics.clinicId],
		references: [clinics.id],
	}),
}));

export const clinicsRelations = relations(clinics, ({ many }) => ({
	doctors: many(doctors),
	patients: many(patients),
	appointments: many(appointments),
	usersToClinics: many(usersToClinics),
}));

export const doctors = pgTable("doctors", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	avatar: text("avatar"),
	clinicId: uuid("clinic_id")
		.notNull()
		.references(() => clinics.id, { onDelete: "cascade" }),
	email: text("email").notNull(),
	speciality: text("speciality").notNull(),
	availableFromWeekDays: integer("available_from_week_days").notNull(),
	availableToWeekDays: integer("available_to_week_days").notNull(),
	availableFromTime: time("available_from_time").notNull(),
	availableToTime: time("available_to_time").notNull(),
	appointmentPriceinCents: integer("appointment_price_in_cents").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updateAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const doctorsRelations = relations(doctors, ({ many, one }) => ({
	clinic: one(clinics, {
		fields: [doctors.clinicId],
		references: [clinics.id],
	}),
	appointments: many(appointments),
}));

export const patients = pgTable("patients", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	sex: patientSexEnum("sex").notNull(),
	phoneNumber: text("phone").notNull(),
	clinicId: uuid("clinic_id")
		.notNull()
		.references(() => clinics.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const patientsRelations = relations(patients, ({ many, one }) => ({
	clinic: one(clinics, {
		fields: [patients.clinicId],
		references: [clinics.id],
	}),
	appointments: many(appointments),
}));

export const appointments = pgTable("appointments", {
	id: uuid("id").defaultRandom().primaryKey(),
	clinic: uuid("clinic_id")
		.notNull()
		.references(() => clinics.id, { onDelete: "cascade" }),
	patientId: uuid("patient_id")
		.notNull()
		.references(() => patients.id, { onDelete: "cascade" }),
	doctorId: uuid("doctor_id")
		.notNull()
		.references(() => doctors.id, { onDelete: "cascade" }),
	date: timestamp("date").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
	clinic: one(clinics, {
		fields: [appointments.clinic],
		references: [clinics.id],
	}),
	patient: one(patients, {
		fields: [appointments.patientId],
		references: [patients.id],
	}),
	doctor: one(doctors, {
		fields: [appointments.doctorId],
		references: [doctors.id],
	}),
}));
