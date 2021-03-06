import { IService } from "src/common/interfaces/IService";
import { green } from 'chalk';
import yargs from 'yargs';

export abstract class BaseSeeder<T> {
    protected constructor(private readonly _entityService: IService<T>) {}

    protected async run(): Promise<void> {
        const amount = this.getAmountFromParameters();

        await this.makeEntities(amount);

        this.printSuccessMessage();
    }

    protected getAmountFromParameters(): number {
        const environmentVariables: unknown = process.env;
        const parameters = yargs(environmentVariables as string[]).argv;
        
        const amount = parameters.amount;

        if(amount === undefined) throw new Error('You need to specify the amount parameter by adding -- --amount=x to your script');

        if(typeof amount !== 'number') throw new Error('Amount parameter must be a number');

        return amount;
    }

    protected async makeEntities(left: number): Promise<void> {
        if(left === 0) return;

        const fakeData = this.generateFakeEntityData();
        const entity = this.createEntityFromFakeData(fakeData);

        await this.saveEntityInDatabase(entity);
        await this.makeEntities(--left);
    }

    protected printSuccessMessage(): void {
        console.log(green('Seeding completed successfully'));
    }

    protected async saveEntityInDatabase(entity: T): Promise<void> {
        await this._entityService.create(entity);
    }

    protected abstract createEntityFromFakeData(fakeData: Partial<T>): T

    protected abstract generateFakeEntityData(): Partial<T>
}