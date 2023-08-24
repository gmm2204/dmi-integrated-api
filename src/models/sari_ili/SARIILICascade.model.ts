import { Model, DataTypes, Sequelize } from 'sequelize';

export class SARIILICascade extends Model {
     public ScreenedNumber?: number;

     public EligibleNumber?: number;
     public EnrolledNumber?: number;

     public TestedNumber?: number;
     public NotTestedNumber?: number;

     public FluANumber?: number;
     public H1N1Number?: number;
     public H3N2Number?: number;
     public NonSybtypeNumber?: number;
     public NotSybtypetNumber?: number;

     public FluBNumber?: number;
     public YamagataNumber?: number;
     public VictoriaNumber?: number;
     public NotDeteterminedNumber?: number;
}