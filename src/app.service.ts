import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class AppService {
    private startTime: Date;
    private commit: string;
    constructor() {
        this.startTime = new Date();
    }


    getCommit(): string {
        if ( ! this.commit ) {
            this.commit = execSync( 'git rev-parse --short HEAD' )
                .toString()
                .trim();
        }

        return this.commit;
    }

    getData( req: Request, ip: string ): object {
        return {
            project: process.env.PROJECT,
            core: 'backend-core',
            by: 'Ty4kaa',
            host: process.env.BACKEND_HOST,
            debug: true,
            commit: this.getCommit(),
            uptime:
                Math.round(
                    ( new Date().getTime() - this.startTime.getTime() ) / 1000,
                ).toString() + 's',
        };
    }
}
