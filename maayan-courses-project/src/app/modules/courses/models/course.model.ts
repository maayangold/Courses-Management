// course.model.ts
export enum LearningMethod {
    FRONTAL = 1,
    ZOOM = 2,
    DiscussionBased = 3
}

export class Course {
    id: number;
    name: string;
    categoryId: number;
    lecturerId: number;
    numberOfLessons: number;
    learningStart: Date;
    syllabus: string[];
    learningMethod: LearningMethod;
    picture: string;

    constructor(
        id?: number,
        name: string = '',
        categoryId: number = null,
        lecturerId: number = null,
        numberOfLessons: number = null,
        learningStart: Date = new Date(),
        syllabus: string[] = [],
        learningMethod: LearningMethod = null,
        picture: string = ''
    ) {
        this.id = id
        this.name = name;
        this.categoryId = categoryId;
        this.lecturerId = lecturerId;
        this.numberOfLessons = numberOfLessons;
        this.learningStart = learningStart;
        this.syllabus = syllabus;
        this.learningMethod = learningMethod;
        this.picture = picture;
    }
}
