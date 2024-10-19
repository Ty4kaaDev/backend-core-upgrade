import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/entity/feedback.entity';
import { Item } from 'src/entity/item.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { RProductDTO } from './response/product.res';
import { RItemDTO } from './response/item.res';
import { RFeedbackDTO } from './response/feedback.res';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MarketService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,

        @InjectRepository(Feedback)
        private readonly feedbackRepository: Repository<Feedback>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        private readonly userService: UserService
    ){}

    async createProduct(user: User, product: string, image?: string): Promise<RProductDTO>{
        const productDB = await this.productRepository.save({
            author: user,
            product: product,
            image: image? image : null,
        })

        return this.prepareProduct(productDB);
    }

    prepareProduct(product: Product): RProductDTO{ 
        return { 
            id: product.id,
            image: product.image,
            product: product.product,
            author: this.userService.prepareUser(product.author)
        }
    }
    async prepareItem(item: Item): Promise<RItemDTO>{ return }
    async prepareFeedBack(feedback: Feedback): Promise<RFeedbackDTO>{return}
}
